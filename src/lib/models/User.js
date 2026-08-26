import mongoose from 'mongoose';
import { type } from 'node:os';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      codeHash: { type: String, default: null }, // Hashed for security
      expiresAt: { type: Date, default: null },
      attempts: { type: Number, default: 0 },
    },
    ticketId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Ticket'
    }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;