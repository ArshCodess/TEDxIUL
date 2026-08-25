import mongoose from 'mongoose';

const razorpaySchema = new mongoose.Schema(
  {
    // Connects Razorpay transaction back to Ticket & User
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    paymentId: {
      type: String,
      default: null, // Populated upon successful checkout
    },
    signature: {
      type: String,
      default: null, // HMAC SHA256 signature from Razorpay
    },
    amount: {
      type: Number,
      required: true, // In paise
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['CREATED', 'CAPTURED', 'FAILED'],
      default: 'CREATED',
    },
    failureReason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Razorpay = mongoose.models.Razorpay || mongoose.model('Razorpay', razorpaySchema);
export default Razorpay;