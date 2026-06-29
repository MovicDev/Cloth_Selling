const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  pricePerYard: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  videoUrl: { type: String },
  colors: [{ type: String }],
  width: { type: String, required: true },
  suitableUses: [{ type: String }],
  isNewArrival: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  viewsCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
