import { NextResponse } from 'next/server';
import crypto from 'crypto';
import User from '../../../../lib/models/User'
import { connectdb } from '../../../../lib/mongo';

export async function POST(request) {
  try {
    await connectdb();

    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user || !user.otp || !user.otp.codeHash) {
      return NextResponse.json(
        { success: false, message: 'OTP not requested or expired. Request a new one.' },
        { status: 400 }
      );
    }

    // Rate limiting: Max 3 failed attempts
    if (user.otp.attempts >= 3) {
      user.otp = { codeHash: null, expiresAt: null, attempts: 0 };
      await user.save();
      return NextResponse.json(
        { success: false, message: 'Too many failed attempts. Please request a new OTP.' },
        { status: 429 }
      );
    }

    // Check expiry
    if (new Date() > new Date(user.otp.expiresAt)) {
      user.otp = { codeHash: null, expiresAt: null, attempts: 0 };
      await user.save();
      return NextResponse.json(
        { success: false, message: 'OTP has expired' },
        { status: 400 }
      );
    }

    // Compare HMAC / SHA256 hashes
    const inputHash = crypto.createHash('sha256').update(otp).digest('hex');

    if (inputHash !== user.otp.codeHash) {
      user.otp.attempts += 1;
      await user.save();
      return NextResponse.json(
        { success: false, message: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Success: Mark user as verified & reset OTP state
    user.isVerified = true;
    user.otp = { codeHash: null, expiresAt: null, attempts: 0 };
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Email verified successfully',
        userId: user._id,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}