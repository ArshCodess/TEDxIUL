import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import User from '../../../../lib/models/User'
import { connectdb } from '../../../../lib/mongo';
import TedxOtpEmail from '../../../../components/TedxEmail'

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request) {
  try {
    await connectdb();

    const { name, email, phoneNumber } = await request.json();

    if (!email || !name || !phoneNumber) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and phone number are required' },
        { status: 400 }
      );
    }

    // Generate secure 6-digit OTP
    const rawOtp = crypto.randomInt(100000, 999999).toString();
    const codeHash = crypto.createHash('sha256').update(rawOtp).digest('hex');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 mins

    // Upsert user details & set OTP metadata
    await User.findOneAndUpdate(
      { email },
      {
        name,
        phoneNumber, 
        isVerified: false,
        otp: {
          codeHash,
          expiresAt,
          attempts: 0,
        },
      },
      { upsert: true, returnDocument:'after' }
    );

    // Send Email 
    const { error } = await resend.emails.send({
      from: `Ticket Booking <${process.env.SENDER_EMAIL}>`,
      to: [email],
      subject: 'Your Verification OTP',
      react:<TedxOtpEmail name={name} otp={rawOtp}/>,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send OTP email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'OTP sent successfully to email' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}