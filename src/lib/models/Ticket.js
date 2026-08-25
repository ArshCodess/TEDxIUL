import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    // Connects Ticket directly to User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    totalAmount: {
      type: Number,
      required: true, // In paise (e.g., ₹500 = 50000)
    },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'FAILED', 'CANCELLED'],
      default: 'PENDING',
      index: true,
    },
    // Connects Ticket directly to Razorpay payment transaction
    razorpayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Razorpay',
      default: null,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);
export default Ticket;