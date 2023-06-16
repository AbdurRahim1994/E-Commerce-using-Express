const jwt = require('jsonwebtoken')

const TokenVerify = (req, res, next) => {
    const { token } = req.headers;
    jwt.verify(token, 'SecretKey123456789', function (err, decoded) {
        if (err) {
            res.status(401).json({ status: "Unauthorized" })
        }
        else {
            const email = decoded.data;
            req.headers.email = email;
            next();
        }
    })
}

module.exports = TokenVerify