import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import User from '../../../../lib/models/User'
import Ticket from '../../../../lib/models/Ticket'
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

    const normalizedEmail = email.toLowerCase().trim();

    const rawOtp = crypto.randomInt(100000, 999999).toString();
    const codeHash = crypto.createHash('sha256').update(rawOtp).digest('hex');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 mins

    const user = await User.findOne({ email: normalizedEmail }).populate('ticketId')
    const confirmedTicket = user?.ticketId?.status === 'CONFIRMED'
      ? user.ticketId
      : await Ticket.findOne({ email: normalizedEmail, status: 'CONFIRMED' });

    if (confirmedTicket) {
      return NextResponse.json(
        { success: false, message: 'Ticket already registered' },
        { status: 409 }
      );
    }

    await User.findOneAndUpdate(
      { email: normalizedEmail },
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
      { upsert: true, returnDocument: 'after' }
    );

    const { error } = await resend.emails.send({
      from: `Verification Code <${process.env.SENDER_OTP_EMAIL}>`,
      to: [normalizedEmail],
      subject: 'Your Verification OTP',
      react: <TedxOtpEmail name={name} otp={rawOtp} />,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send OTP email' },
        { status: 502 }
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