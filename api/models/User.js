import mongoose from "mongoose";

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    street: { type: String, required: true },
    location: { type: String, required: true },
    exteriorNo: { type: Number, required: true },
    intiriorNo: { type: Number },
    betweenStr: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: Number, required: true },
    references: { type: String, required: true },
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  personalCon: String,
  role: {
    type: String,
    enum: ['Admin', 'Employee', 'Customer'],
    defaul: 'Customer',
    required: true,
  },
  //se cambia a false cuando se paga el carrito y se cambia a true cuando se agrega un producto
  carritoActivo: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model('User', schema);