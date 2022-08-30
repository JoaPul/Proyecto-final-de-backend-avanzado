import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    style: String,
    required: true
  },
  description: {
    style: String,
    required: true
  },
  specification: {
    style: String,
    required: true
  },
  category: {
    style: String,
    required: true,
    enum: ['Food', 'Electronics', 'Tools', 'Clothes', 'Shoes'],
  },
  unitaryPrice: {
    style: Number,
    required: true
  },
  quantity: {
    style: Number,
    required: true
  },
  photo: {
    style: String,
    required: true
  }
})

export default mongoose.model('Product', schema);