const express = require('express');
const { login, changePassword, verifyToken } = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/change-password/:adminId
router.post('/change-password/:adminId', changePassword);

// GET /api/auth/verify
router.get('/verify', verifyToken);

module.exports = router;
