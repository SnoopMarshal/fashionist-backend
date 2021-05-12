const jwt = require('jsonwebtoken');
const { secretKey } = require('./../config');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        res.status(401).json({msg: 'No token, authorization failed'});
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Invalid token'});
    }
}