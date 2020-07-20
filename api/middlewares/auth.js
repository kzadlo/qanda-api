const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        req.userFromToken = jwt.verify(
            req.headers.authorization.split(' ')[1],
            process.env.JWT_KEY
        );
        next();
    } catch (error) {
        res.status(401).json({
            message: error
        });
    }
};