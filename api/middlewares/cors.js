module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
        return res.status(200).json({});
    }

    next();
};