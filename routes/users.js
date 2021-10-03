const express = require('express') //imported express
const mongoose = require('mongoose') //imported mongoose
const router = express.Router() //routing instance of express
var validator = require('validator');

const jwt = require('jsonwebtoken')
const bodyparser = require('body-parser');
const UserModel = require('../models/user');

router.use(bodyparser.urlencoded({ extended: false }))
router.use(bodyparser.json())

/*
Router Name - Signup Route
Route Type - Public
Route Description - Public Route to Signup
*/

router.post('/signup', async(req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    if (typeof(name) != "undefined" && typeof(email) != "undefined" && typeof(password) != "undefined") {
        if (!validator.isEmail(email.trim())) {
            res.json({ "msg": "Email is Malformed" })
        } else if (!validator.isStrongPassword(password.trim())) {
            res.json({ "msg": "Create a password with minimum of 8 characters, 1 uppercase, lower case, number & special character is needed" })
        } else //this block will run to save the data in db of user
        {
            try {
                const Userdoc = UserModel({ name, email, password }) //instance of usermodel document
                await Userdoc.save((err) => {
                    if (!err) {
                        res.json("Registration Successful")
                    } else {
                        res.json({ "msg": "an user with the email " + email + " already exists" })
                    }
                })
            } catch (err) {
                res.sendStatus(403)
            }
        }
    } else {
        res.sendStatus(403)
    }
})

router.post('/login', async(req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (typeof(email) != "undefined" && typeof(password) != "undefined") {
        if (!validator.isEmail(email.trim())) {
            res.json({ "msg": "Email is Malformed" })
        } else //this block will run to login & Check the data in db of user
        {
            await UserModel.find({ email: email.trim() }, (err, docs) => {
                if (docs.length == 0) {
                    res.json({ "msg": "no such user exist in db" })
                } else { // create a jwt token & return it
                    const { name, email, role, isAdmin, credits } = docs[0]
                    const userData = { name, email, role, isAdmin, credits }
                    jwt.sign({ userData }, process.env.JWT_SECRET, { expiresIn: '5m' }, (err, token) => {
                        if (!err) {
                            res.json({ "token": token })
                        }
                    })
                }
            })
        }
    } else {
        res.sendStatus(403)
    }
})

module.exports = router