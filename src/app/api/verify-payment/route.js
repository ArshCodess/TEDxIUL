import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Counter from '../../../lib/models/counter';
import Ticket from '../../../lib/models/Ticket';
import User from '../../../lib/models/User';
import TedxTicketEmail from '../../../components/TedxTicketEmail';
import QRCode from 'qrcode'
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,razorpayId, user ,passTier, totalAmount} =
      await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !razorpayId || !user?.email || !passTier || !totalAmount) {
      return NextResponse.json(
        { success: false, message: 'Missing or invalid payment details' },
        { status: 400 }
      );
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body)
      .digest('hex');

    const receivedSignature = Buffer.from(razorpay_signature);
    const expectedSignatureBuffer = Buffer.from(expectedSignature);
    const isSignatureValid = receivedSignature.length === expectedSignatureBuffer.length
      && crypto.timingSafeEqual(expectedSignatureBuffer, receivedSignature);

    if (isSignatureValid) {
      const normalizedEmail = user.email.toLowerCase().trim();
      const userDoc = await User.findOne({ email: normalizedEmail });

      if (!userDoc) {
        return NextResponse.json(
          { success: false, message: 'Verified user account not found' },
          { status: 404 }
        );
      }
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'ticketSequence' },
        { $inc: { seq: 1 } },
        { returnDocument:'after', upsert: true }
      );
      const tierPrefixes = {
        general: 'GEN',
        gold: 'GOLD',
        platinum: 'PLAT',
        faculty: 'FAC'
      };

      const prefix = tierPrefixes[passTier] || 'GEN';
      const paddedSeq = String(counter.seq).padStart(4, '0');
      const ticketId = `TEDX-2026-${paddedSeq}`;
      const passCode = `${prefix}-SOT-2026-${paddedSeq}`

      const newTicket = await Ticket.create({
        ticketId,
        userId:userDoc._id,
        email:normalizedEmail,
        passTier,
        passCode,
        totalAmount,
        status: 'CONFIRMED',
        razorpayId: razorpayId,
        attendance: {
          status: 'NOT_ENTERED',
        },
      });

      await User.findByIdAndUpdate(userDoc._id, { ticketId: newTicket._id });
      console.log("DB: Ticket Creation DONE");

      const URI_IMG = encodeURIComponent(passCode);
      await resend.emails.send({
        from:`Here is your Ticket! <${process.env.SENDER_TICKET_EMAIL}>`,
        to:[normalizedEmail],
        subject:"Your ticket is generated successfully",
        react:<TedxTicketEmail name={userDoc.name} passCode={URI_IMG}/>
      });

      return NextResponse.json({
        success: true,
        message: 'Payment verified and Ticket generated successfully  ',
      });
    } else {
      // Mark as failed in DB
      return NextResponse.json(
        { success: false, message: 'Invalid payment signature' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to verify payment. Please contact support.' },
      { status: 500 }
    );
  }
}