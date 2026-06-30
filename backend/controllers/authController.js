const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Admin Login
async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Simple password check (use bcrypt in production)
    if (admin.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ 
      token, 
      admin: { id: admin._id, username: admin.username } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Change Password
async function changePassword(req, res) {
  try {
    const { adminId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Old and new passwords required' });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Verify old password
    if (admin.password !== oldPassword) {
      return res.status(401).json({ error: 'Incorrect old password' });
    }

    // Update password
    admin.password = newPassword;
    admin.updatedAt = new Date();
    await admin.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Verify Token
async function verifyToken(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(401).json({ error: 'Admin not found' });
    }

    res.json({ valid: true, admin: { id: admin._id, username: admin.username } });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
}

module.exports = { login, changePassword, verifyToken };
