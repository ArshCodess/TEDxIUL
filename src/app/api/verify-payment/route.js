import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, ticketId } =
      await request.json();

    // 1. Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: 'Missing payment details' },
        { status: 400 }
      );
    }

    // 2. Generate expected signature: HMAC-SHA256(order_id + "|" + payment_id, secret)
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body)
      .digest('hex');

    // 3. Compare signatures using timingSafeEqual to prevent timing attacks
    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(razorpay_signature)
    );

    if (isSignatureValid) {
      // 4. Update ticket/order status in your database
      // await Ticket.findOneAndUpdate(
      //   { "razorpay.orderId": razorpay_order_id },
      //   { 
      //     status: 'CONFIRMED', 
      //     "razorpay.paymentId": razorpay_payment_id,
      //     "razorpay.signature": razorpay_signature 
      //   }
      // );

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
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
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}