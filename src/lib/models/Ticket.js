import mongoose from 'mongoose';

const perkClaimSchema = new mongoose.Schema(
  {
    isEligible: { type: Boolean, default: false },
    itemLabel: { type: String, default: '' },
    isClaimed: { type: Boolean, default: false, index: true },
    claimedAt: { type: Date, default: null },
    claimedByStaffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { _id: false }
);

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    passTier: {
      type: String,
      enum: ['general', 'gold', 'platinum', 'faculty'],
      required: true,
      index: true,
    },
    passCode: {
      type: String,
      required: true,
      trim: true,
    },
    seatingTier: {
      type: String,
      enum: ['Back Seating', 'Middle Seating', 'Front-row seating', 'VIP seating'],
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      immutable: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['CONFIRMED', 'CANCELLED'],
      default: 'CONFIRMED',
      index: true,
    },
    razorpayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Razorpay',
      required: true,
    },
    attendance: {
      status: {
        type: String,
        enum: ['NOT_ENTERED', 'ENTERED', 'EXITED'],
        default: 'NOT_ENTERED',
        index: true,
      },
      enteredAt: { type: Date, default: null },
      exitedAt: { type: Date, default: null },
      scannedByStaffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },
    },
    perksRedemption: {
      swagKit: { type: perkClaimSchema, default: () => ({}) },
      refreshments: { type: perkClaimSchema, default: () => ({}) },
      meal: { type: perkClaimSchema, default: () => ({}) },
      meetAndGreet: { type: perkClaimSchema, default: () => ({}) },
    },
  },
  { timestamps: true }
);

// Modern Mongoose hook: No 'next' parameter
ticketSchema.pre('validate', function () {
  if (this.isNew || this.isModified('passTier')) {
    switch (this.passTier) {
      case 'general':
        this.seatingTier = 'Back Seating';
        this.perksRedemption.swagKit.isEligible = true;
        this.perksRedemption.swagKit.itemLabel = 'Key Rings';
        this.perksRedemption.refreshments.isEligible = true;
        this.perksRedemption.refreshments.itemLabel = 'Standard Refreshments';
        this.perksRedemption.meal.isEligible = false;
        this.perksRedemption.meetAndGreet.isEligible = false;
        break;

      case 'gold':
        this.seatingTier = 'Middle Seating';
        this.perksRedemption.swagKit.isEligible = true;
        this.perksRedemption.swagKit.itemLabel = 'Diary & Pen';
        this.perksRedemption.refreshments.isEligible = true;
        this.perksRedemption.refreshments.itemLabel = 'Refreshments';
        this.perksRedemption.meal.isEligible = true;
        this.perksRedemption.meal.itemLabel = 'Full Meal';
        this.perksRedemption.meetAndGreet.isEligible = false;
        break;

      case 'platinum':
        this.seatingTier = 'Front-row seating';
        this.perksRedemption.swagKit.isEligible = true;
        this.perksRedemption.swagKit.itemLabel = 'TEDx kit';
        this.perksRedemption.refreshments.isEligible = true;
        this.perksRedemption.refreshments.itemLabel = 'Refreshments';
        this.perksRedemption.meal.isEligible = true;
        this.perksRedemption.meal.itemLabel = 'Full Meal';
        this.perksRedemption.meetAndGreet.isEligible = true;
        this.perksRedemption.meetAndGreet.itemLabel = 'Meet & Greet with speakers';
        break;

      case 'faculty':
        this.seatingTier = 'VIP seating';
        this.perksRedemption.swagKit.isEligible = true;
        this.perksRedemption.swagKit.itemLabel = 'TEDx kit';
        this.perksRedemption.refreshments.isEligible = true;
        this.perksRedemption.refreshments.itemLabel = 'VIP Refreshments';
        this.perksRedemption.meal.isEligible = true;
        this.perksRedemption.meal.itemLabel = 'Full Meal';
        this.perksRedemption.meetAndGreet.isEligible = true;
        this.perksRedemption.meetAndGreet.itemLabel = 'VIP Meet & Greet with speakers';
        break;
    }
  }
});

// Force-clear model cache in Next.js hot reload environments
const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);

export default Ticket;