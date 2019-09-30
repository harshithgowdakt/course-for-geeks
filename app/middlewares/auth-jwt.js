const jwt = require('jsonwebtoken');
const config = require('../config/env-config');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Acess denied. no token provided');

    try {
        const decoded = jwt.verify(token, config.jwt.secretOrKey);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid token..');
    }
}