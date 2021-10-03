const mongoose = require('mongoose') //imported mongoose
const userSchema = mongoose.Schema({

    "name": {
        type: String,
        trim: true,
        required: true
    },

    "email": {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    "role": {
        type: String,
        trim: true,
        default: "user"
    },

    "isAdmin": {
        type: Boolean,
        default: false
    },

    "registeredon": {
        type: Date,
        default: Date.now()
    },

    "password": {
        type: String,
        required: true
    },
    "credits": {
        type: Number,
        default: 100
    }

}, { strict: true })

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel