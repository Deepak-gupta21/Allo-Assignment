// routes/adminRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }

        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }

        const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
