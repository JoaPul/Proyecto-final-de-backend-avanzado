import mongoose from "mongoose";

const schema = new mongoose.Schema({
  Total: {
    type: Number,
    default: 0
  },
  payDay: {
    type: Date,
    default: null
  },
  articulos: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      price: {
        type: Number,
        default: 0
      }
    }
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

export default mongoose.model('Compra', schema);