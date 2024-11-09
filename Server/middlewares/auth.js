// for ensuring the authentication
const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403).json({
            message: "unauthorized , jwt token is required"
        })
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(403).json({
            message: "jwt token is wrong or expired"
        })
    }
}
module.exports = ensureAuthenticated;