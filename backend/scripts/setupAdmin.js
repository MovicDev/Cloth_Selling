const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('../models/Admin');

const DataBase_API = process.env.MONGODB_URI;

async function setupAdmin() {
  try {
    await mongoose.connect(DataBase_API);
    console.log("MongoDB connected");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create default admin
    const admin = new Admin({
      username: 'admin',
      password: '1234', 
      email: 'admin@seemat.com'
    });

    await admin.save();

    process.exit(0);
  } catch (error) {
    console.error("Setup error:", error);
    process.exit(1);
  }
}

setupAdmin();
