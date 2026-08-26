import mongoose from 'mongoose';

const razorpaySchema = new mongoose.Schema(
  {
    // Connects Razorpay transaction back to Ticket & User
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      // required: true, ticket will only generated after successfull payment
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
      default: null,
    },
    signature: {
      type: String,
      default: null, 
    },
    amount: {
      type: Number,
      required: true,
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