import mongoose from "mongoose";

const schema = mongoose.Schema({
  Articulos: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Compra',
      price: {
        type: Number,
        default: 0
      }
    }
  }]
});

export default mongoose.model('Historial', schema);