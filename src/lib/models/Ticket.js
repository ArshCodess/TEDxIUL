import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema(
  {
    // Unique Human-Readable Ticket Number (e.g., TKT-894201)
    ticketId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    // Reference to the User buying the ticket
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Event or Item details
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },

    // Seat or Category metadata
    ticketType: {
      type: String,
      enum: ['STANDARD', 'VIP', 'EARLY_BIRD'],
      default: 'STANDARD',
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    // Payment Amount details (Stored in Paise for Razorpay compliance: ₹500 = 50000)
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
      uppercase: true,
    },

    // Overall Ticket Lifecycle Status
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'FAILED', 'CANCELLED', 'EXPIRED'],
      default: 'PENDING',
      index: true,
    },

    // Verification Flags
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    // Razorpay Specific Fields
    razorpay: {
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
      failureReason: {
        type: String,
        default: null,
      },
    },

    // Optional metadata for entry checks at the venue
    qrCodeData: {
      type: String,
      default: null, // Populated after confirmation
    },
    isUsed: {
      type: Boolean,
      default: false, // Marked true when scanned at the entrance
    },
    usedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt
  }
);

// Compound Index for fast user ticket queries sorted by date
ticketSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Ticket', ticketSchema);