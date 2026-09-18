import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Counter from '../../../lib/models/counter';
import Ticket from '../../../lib/models/Ticket';
import User from '../../../lib/models/User';
import Razorpay from '../../../lib/models/Razorpay';
import TedxTicketEmail from '../../../components/TedxTicketEmail';
import { Resend } from 'resend';
import { getCouponDiscountedPassPrice, PASSES_DATA } from '../../../data/passesData';
import Coupon from '../../../lib/models/Coupon';
import { connectdb } from '../../../lib/mongo';

const resend = new Resend(process.env.RESEND_API_KEY);

const CAPPING_OBJECT = {
  basic: 'basicSeq',
  general: 'geneSeq',
  gold: 'goldSeq',
  platinum: 'platSeq',
  faculty: 'facSeq'
};

const TIER_PREFIXES = {
  basic: 'BAS',
  general: 'GEN',
  gold: 'GOLD',
  platinum: 'PLAT',
  faculty: 'FAC'
};

export async function POST(request) {
  let counter;
  let redeemedCoupon = null;
  let reqBody = {};

  try {
    await connectdb()
    reqBody = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, razorpayId, user, passTier, totalAmount } = reqBody;

    const pass = PASSES_DATA[passTier];
    const razorpayRecord = await Razorpay.findOne({ _id: razorpayId, orderId: razorpay_order_id });

    // if already processed, don't recreate ticket
    if (razorpayRecord?.status === 'CAPTURED') {
      return NextResponse.json({ success: true, message: 'Payment already processed' });
    }

    const couponCode = razorpayRecord?.couponCode || null;
    const expectedTotalAmount = pass ? getCouponDiscountedPassPrice(pass.price, couponCode) * 100 : null;

    if (!razorpayRecord || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !razorpayId || !user?.email || !pass || totalAmount !== expectedTotalAmount || razorpayRecord.amount !== expectedTotalAmount) {
      return NextResponse.json(
        { success: false, message: 'Missing or invalid payment details' },
        { status: 400 }
      );
    }

    // Signature Verification
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(payload)
      .digest('hex');

    const receivedSignature = Buffer.from(razorpay_signature);
    const expectedSignatureBuffer = Buffer.from(expectedSignature);
    const isSignatureValid = receivedSignature.length === expectedSignatureBuffer.length
      && crypto.timingSafeEqual(expectedSignatureBuffer, receivedSignature);

    if (!isSignatureValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    const normalizedEmail = user.email.toLowerCase().trim();
    const userDoc = await User.findOne({ email: normalizedEmail });

    if (!userDoc) {
      return NextResponse.json(
        { success: false, message: 'Verified user account not found' },
        { status: 404 }
      );
    }

    // 1. Redeem Coupon
    if (couponCode) {
      redeemedCoupon = await Coupon.findOneAndUpdate(
        { code: couponCode, redeemed: false },
        {
          $set: {
            redeemed: true,
            redeemedAt: new Date(),
            redeemedByOrderId: razorpay_order_id,
          },
        },
        { new: true }
      );

      if (!redeemedCoupon) {
        return NextResponse.json(
          { success: false, message: 'This coupon has already been used' },
          { status: 409 }
        );
      }
    }

    // 2. Increment Counter
    counter = await Counter.findByIdAndUpdate(
      { _id: 'ticketSequence' },
      { $inc: { seq: 1, [CAPPING_OBJECT[passTier]]: 1 } },
      { returnDocument: 'after', upsert: true }
    );

    const prefix = TIER_PREFIXES[passTier] || 'GEN';
    const paddedSeq = String(counter.seq).padStart(4, '0');
    const ticketId = `TEDX-2026-${paddedSeq}`;
    const passCode = `${prefix}-SOT-2026-${paddedSeq}`;

    // 3. Create Ticket & Update User/Razorpay
    const newTicket = await Ticket.create({
      ticketId,
      userId: userDoc._id,
      email: normalizedEmail,
      passTier,
      passCode,
      totalAmount,
      status: 'CONFIRMED',
      razorpayId: razorpayId,
      attendance: { status: 'NOT_ENTERED' },
    });

    await User.findByIdAndUpdate(userDoc._id, { ticketId: newTicket._id });

    await Razorpay.findOneAndUpdate({ orderId: razorpay_order_id }, {
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      status: "CAPTURED",
      failureReason: "None"
    });

    // 4. Send Email
    try {
      const URI_IMG = encodeURIComponent(passCode);
      await resend.emails.send({
        from: `Here is your Ticket! <${process.env.SENDER_TICKET_EMAIL}>`,
        to: [normalizedEmail],
        subject: "Your ticket is generated successfully",
        react: <TedxTicketEmail name={userDoc.name} uri={URI_IMG} passCode={passCode} />
      });
    } catch (emailError) {
      console.error("Email sending failed, but ticket was created successfully:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and Ticket generated successfully',
    });

  } catch (error) {
    console.error('Verification error:', error);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, razorpayId, user, passTier, totalAmount } = reqBody;

    // Rollback Coupon if redeemed
    if (redeemedCoupon) {
      await Coupon.findByIdAndUpdate(redeemedCoupon._id, {
        $set: { redeemed: false, redeemedAt: null, redeemedByOrderId: null }
      });
    }

    // Rollback Counter if incremented
    if (counter && passTier && CAPPING_OBJECT[passTier]) {
      await Counter.findByIdAndUpdate(
        { _id: 'ticketSequence' },
        { $inc: { seq: -1, [CAPPING_OBJECT[passTier]]: -1 } }
      );
    }

    // Mark Payment as Failed
    if (razorpay_order_id) {
      await Razorpay.findOneAndUpdate({ orderId: razorpay_order_id }, {
        paymentId: razorpay_payment_id || null,
        signature: razorpay_signature || null,
        status: "FAILED",
        failureReason: error.message || "Unknown Error",
      });
    }
    await resend.emails.send({
      from: `Error in tedxiul <${process.env.SENDER_TICKET_EMAIL}>`,
      to: "sayyedarslaanulhasan0@gmail.com",
      subject: "Error occured in Verify-payment",
      html:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Payment Error Notification</title>
    <style type="text/css">
        /* Client-specific Resets */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        
        /* Mobile styles */
        @media screen and (max-width: 600px) {
            .email-container { width: 100% !important; margin: auto !important; }
            .fluid { max-width: 100% !important; height: auto !important; margin-left: auto !important; margin-right: auto !important; }
            .stack-column { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important; }
            .padding-mobile { padding-left: 20px !important; padding-right: 20px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; -webkit-font-smoothing: antialiased;">
    <!-- Hidden Preheader Text for Email Clients -->
    <div style="display: none; font-size: 1px; color: #f4f5f7; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Action Required: Payment Processing Error detected for order {${razorpay_order_id}}.
    </div>

    <!-- Main Email Container -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f5f7; table-layout: fixed;">
        <tr>
            <td align="center" style="padding: 40px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                    
                    <!-- Top Warning Bar -->
                    <tr>
                        <td align="center" style="background-color: #dc2626; padding: 28px 30px; text-align: center;">
                            <!-- Alert Icon -->
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; width: 48px; height: 48px; margin-bottom: 12px;">
                                        <span style="color: #ffffff; font-size: 24px; font-weight: bold; line-height: 48px;">&#9888;</span>
                                    </td>
                                </tr>
                            </table>
                            <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 12px 0 6px 0; letter-spacing: -0.5px;">Payment Processing Alert</h1>
                            <p style="color: #fecaca; font-size: 14px; margin: 0; font-weight: 400;">An issue occurred while verifying or processing your payment.</p>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td class="padding-mobile" style="padding: 30px 40px 20px 40px;">
                            <p style="color: #374151; font-size: 15px; line-height: 22px; margin: 0 0 20px 0;">
                                Hi <strong>{{user.name}}</strong> ({${user.email}}),
                            </p>
                            <p style="color: #4b5563; font-size: 14px; line-height: 22px; margin: 0 0 24px 0;">
                                We encountered a problem while processing your transaction for the <strong>{${passTier}}</strong> tier subscription. Below are the execution and signature details received from the gateway for reference.
                            </p>

                            <!-- Alert Box -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 0 6px 6px 0; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 14px 16px;">
                                        <p style="color: #991b1b; font-size: 13px; font-weight: 600; margin: 0 0 4px 0;">Status Message:</p>
                                        <p style="color: #b91c1c; font-size: 13px; margin: 0; font-family: monospace;">PAYMENT_VERIFICATION_FAILED / SIGNATURE_MISMATCH</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Section Title -->
                            <h3 style="color: #111827; font-size: 15px; font-weight: 600; margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb;">
                                Transaction Overview
                            </h3>

                            <!-- Order Overview Table -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 6px 0; color: #6b7280; font-size: 14px;">User ID:</td>
                                    <td align="right" style="padding: 6px 0; color: #111827; font-size: 14px; font-weight: 500;">{${user.id}}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Pass Tier Requested:</td>
                                    <td align="right" style="padding: 6px 0; color: #111827; font-size: 14px; font-weight: 600;">{${passTier}}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Total Amount:</td>
                                    <td align="right" style="padding: 6px 0; color: #059669; font-size: 16px; font-weight: 700;">{${totalAmount}}</td>
                                </tr>
                            </table>

                            <!-- Technical Debug Details Title -->
                            <h3 style="color: #111827; font-size: 15px; font-weight: 600; margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb;">
                                Gateway Technical Details
                            </h3>

                            <!-- Technical Code Card -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1e293b; border-radius: 8px; margin-bottom: 28px;">
                                <tr>
                                    <td style="padding: 16px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-family: 'Courier New', Courier, monospace; font-size: 12px; line-height: 18px;">
                                            <tr>
                                                <td style="color: #94a3b8; padding-bottom: 6px; width: 140px;">razorpayId:</td>
                                                <td style="color: #38bdf8; padding-bottom: 6px; word-break: break-all;">{${razorpayId}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #94a3b8; padding-bottom: 6px;">razorpay_order_id:</td>
                                                <td style="color: #e2e8f0; padding-bottom: 6px; word-break: break-all;">{${razorpay_order_id}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #94a3b8; padding-bottom: 6px;">razorpay_payment_id:</td>
                                                <td style="color: #e2e8f0; padding-bottom: 6px; word-break: break-all;">{${razorpay_payment_id}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #94a3b8; vertical-align: top;">razorpay_signature:</td>
                                                <td style="color: #f43f5e; word-break: break-all; vertical-align: top;">{${razorpay_signature}}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Button Section -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" style="padding-bottom: 10px;">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" style="border-radius: 6px; background-color: #2563eb;">
                                                    <a href="https://yourdomain.com/support?order={{razorpay_order_id}}" target="_blank" style="font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; display: inline-block; background-color: #2563eb; border: 1px solid #2563eb;">
                                                        Contact Support Team
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 20px 40px; border-top: 1px solid #f3f4f6; text-align: center;">
                            <p style="color: #9ca3af; font-size: 12px; line-height: 18px; margin: 0 0 6px 0;">
                                If you believe money was deducted from your account, please do not worry. Unverified transactions are automatically refunded by Razorpay within 3–5 business days.
                            </p>
                            <p style="color: #9ca3af; font-size: 11px; margin: 0;">
                                Automated System Notification &bull; Generated from backend payload
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
    })

    return NextResponse.json(
      { success: false, message: 'Unable to verify payment. Please contact support.' },
      { status: 500 }
    );
  }
}