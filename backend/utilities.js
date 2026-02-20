const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "Access denied" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(401);
            }
            else {
                req.user = user;
                next();
            }

        })
    }
}

module.exports = {
    authenticateToken
}