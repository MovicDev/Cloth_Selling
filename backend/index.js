const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose'); 
const healthRoutes = require('./routes/healthRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingsRoutes);

app.listen(PORT, () => {
  console.log(`Seemat backend running on http://localhost:${PORT}`);
});

const DataBase_API = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(DataBase_API);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDB();