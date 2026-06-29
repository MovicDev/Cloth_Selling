const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  quantityYards: { type: Number, required: true },
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  colorSelected: { type: String, required: true },
  additionalNotes: { type: String },
  status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
