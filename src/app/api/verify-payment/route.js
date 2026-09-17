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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, passTier } = reqBody;

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

    return NextResponse.json(
      { success: false, message: 'Unable to verify payment. Please contact support.' },
      { status: 500 }
    );
  }
}