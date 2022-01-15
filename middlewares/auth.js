const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = async function (req, res, next) {
    try {
        const token = req.header("x-auth-token");

        if (!token) return res.status(401).send("Access denied. No token provided");

        let decoded = jwt.verify(token, process.env.jwtPrivateKey);
     
        let user = await db.User.findOne({ where: { id: decoded } });
        
        if (user) {
            req.user = user;
        } else {
            throw new Error("Bad Request");
        }

        next();
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
};
