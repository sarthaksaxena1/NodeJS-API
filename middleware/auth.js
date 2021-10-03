//authentication check middleware

const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')
const Auth = (req, res, next) => {
    if (typeof(req.headers['authorization']) != "undefined") {
        const Bearer = req.headers['authorization']
        const BearerToken = Bearer.split(' ')[1]
        jwt.verify(BearerToken, process.env.JWT_SECRET, (err, decoded) => {
            if (!err) {
                req.userData = decoded.userData
                next()
            } else {
                res.json({ "msg": "Token is malformed" })
            }
        })
    } else {
        res.json({ "msg": "Authorization header is missing" })
    }
}
module.exports = Auth