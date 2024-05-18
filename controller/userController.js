const BlogModel = require('../model/model');
const jwt = require("jsonwebtoken");
const  bcrypt = require('bcryptjs');
const { handleErrorFunc } = require('../utils/errorFunc');
const {SignupModel} = require('../model/signup');
const {sendMail} = require('../utils/mail')

const handleHome = (req, res) => {   
        try{
                res.status(200).render('home', {title: "Blogify"})
        }
        catch(err) {
                console.log(err.message)
        }
}

const handleBlogs = async (req, res) => {
        try {
                const blogs = await BlogModel.find()
                console.log(blogs)
                res.status(200).render('viewblog', {title: "Blogs", blogs: blogs})
        }
        catch(err) {
                console.log(err)
        }
}

const handleAdmin = (req, res) => {
        try{
                res.status(200).render('postblog', {title: "Admin"})
        }
        catch(err) {
                console.log(err)
        }
}

const handleAbout = (req, res) => {
        try{
                res.status(200).render('about', {title: "About us"})
        }
        catch(err) {
                console.log(err)
        }
}

const handleContact = (req, res) => {
        try{
                res.status(200).render('contact', {title: "Contact us"})
        }
        catch(err) {
                console.log(err)
        }
}

const handleSingleView = async (req, res) => {
        try{
                const {id} = req.params
                const blog = await BlogModel.findById(id, {})
                console.log(blog)
                res.status(200).render('singleblog', {title: "Blog", blog})
        }
        catch(err) {
                console.log(err)
        }
}

const logout = async (req, res) => {
        try{
                await res.cookie('userToken', "", {maxAge: 0})
                res.redirect('/login-page')
        }
        catch(err) {
                console.log(err)
        }
}

const signupHandler = async (req, res) => {
        try {
            res.status(200).render('signup')
        }
        catch(err) {
            console.log(err.message)
        }
}

const loginHandler = async (req, res) => {
        try {
                res.status(200).render("login", {title: "Blogify - Login"})
        }
        catch(err) {
                console.log(err.message)
        }
}

const resetPasswordEmall = (req, res) => {
        try {
                res.status(200).render('resetPasswordEmail', {title: "Reset Password"})
        }
        catch(err) {
                console.log(err)
        }
}

const postResetPasswordEmail = async (req, res) => {
        try {
            const {email} = req.body
            const user = await SignupModel.findOne({ email })
            if(!user) {
                throw new Error("user with the email inputed does not exist")
            }
            await jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 5},
                async (err, token) => {
                    if(err) {
                        throw new Error(err.message)
                    }
                    let url = `http://localhost:3000/update-password/${user._id}/${token}`
                    await sendMail(user.email, "RESET PASSWORD LINK", url)
                })
        }
        catch(err) {
            console.log(err.message)
            res.status(400).json({
                success: false,
                msg: err.message
            })
        }
}

const getUpdatePassword = async (req, res) => {
        try {
                const {id, token} = req.params
                console.log(req.params)
                res.status(200).render("updateNewPassword", {id, token})
        }
        catch(err) {
                console.log(err.message)
        }
}

const postUpdatedPassword = async (req, res) => {
        try {
                const {id, token} = req.params
                console.log(req.params)
                const {password} = req.body
                console.log(id, token, password)
                await jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedToken) => {
                        if(err) {
                                throw new Error(err.message)
                        }
                        const salt = await bcrypt.genSalt(10)
                        const hashedPassword = await bcrypt.hash(password, salt)
                        const updatedPassword = await SignupModel.findByIdAndUpdate({_id: id}, {password: hashedPassword})
                        res.status(202).redirect('/login-page') 
                })
        }
        catch(err) {
                console.log(err.message)
                res.status(400).json({
                        success: false,
                        msg: err.message
                })
        }
}

const handleError = (req, res) => {
        try{
                res.status(404).render('error', {title: "404"})
        }
        catch(err) {
                console.log(err)
        }
}

module.exports = {
    handleHome,
    handleBlogs,
    handleAdmin, 
    handleAbout, 
    handleContact, 
    handleSingleView, 
    signupHandler,
    loginHandler,
    postResetPasswordEmail,  
    resetPasswordEmall,
    getUpdatePassword,
    logout,
    postUpdatedPassword,
    handleError
}