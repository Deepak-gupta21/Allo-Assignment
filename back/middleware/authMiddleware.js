// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.admin = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;
