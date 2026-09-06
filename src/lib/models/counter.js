import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
  generalSeq: { type: Number, default: 0 },
  goldSeq: { type: Number, default: 0 },
  paltSeq: { type: Number, default: 0 },
  facSeq: { type: Number, default: 0 },
  studSeq: { type: Number, default: 0 },
});

const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);
export default Counter;