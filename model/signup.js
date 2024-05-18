const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        Unirue: true
    },
    password: {
        type: String,
        required: true,
    },
    tel: {
        type: Number,
        required: true
    },
    address: {
        type: String,
    },
    accountNum: {
        type: Number
    },
    accountBal: {
        type: Number,
        default: 0
    },
    suspended: {
        type: Boolean,
        default: false
    },
})

const SignupModel = mongoose.model("users", signupSchema)

module.exports = {SignupModel}