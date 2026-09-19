import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
  geneSeq: { type: Number, default: 0 },
  goldSeq: { type: Number, default: 0 },
  platSeq: { type: Number, default: 0 },
  facSeq: { type: Number, default: 0 },
  basicSeq: { type: Number, default: 0 },
  basicCap: { type: Number, default: 29 },
  generalCap: { type: Number, default: 28 },
  goldCap: { type: Number, default: 21 },
  platinumCap: { type: Number, default: 22 },
  facultyCap: { type: Number, default: 0 },
});

const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);
export default Counter;