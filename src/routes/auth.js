const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
