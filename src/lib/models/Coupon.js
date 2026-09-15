import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
      uppercase: true,
      trim: true,
    },
    redeemed: {
      type: Boolean,
      default: false,
      index: true,
    },
    redeemedAt: {
      type: Date,
      default: null,
    },
    redeemedByOrderId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
export default Coupon;