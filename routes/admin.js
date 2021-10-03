const express = require('express') //imported express
const mongoose = require('mongoose') //imported mongoose
const router = express.Router() //routing instance of express
var validator = require('validator');

const jwt = require('jsonwebtoken')
const bodyparser = require('body-parser');
const UserModel = require('../models/user');

router.use(bodyparser.urlencoded({ extended: false }))
router.use(bodyparser.json())
const Auth = require('../middleware/auth')
const { route } = require('./users');

// protected route
router.get('/show/users', Auth, async(req, res) => {
    if (req.userData.isAdmin) {
        await UserModel.find({}, (err, docs) => {
            if (!err) {
                res.json(docs)
            } else {
                res.json({ "msg": "Some Error Occured" })
            }
        }).select('-password')
    } else {
        res.status(401).json({ "msg": "Unauthorized Access not allowed" })
    }
})

module.exports = router