const BlogModel = require('../model/model')
const ContactModel = require('../model/contact')
const SubscriberModel = require('../model/subscriber')
const {SignupModel} = require('../model/signup')
const  bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {genAccountNumber} = require('../utils/genAccNum')
const { handleErrorFunc } = require('../utils/errorFunc')
const {sendMail} = require('../utils/mail')


const handleBlogPost = async (req, res) => {
    try {
        const {title, email, date, content, desc, image, writer} = req.body
        const BlogDetails = new BlogModel({ title, email, date, desc, image, writer, content })
        const savedBlog = await BlogDetails.save()
        res.status(201).redirect('/blog')
    }
    catch(err) {
        console.log(err)
    }
}

const handleContactPost = async (req, res) => {
    try {
        const {name, email, subject, message} = req.body
        const ContactDetail = new ContactModel({name, email, subject, message})
        const savedContact = await ContactDetail.save()
        res.status(201).redirect('/contact')
    }
    catch(err){
        console.log(err)
    }
}

const handleSubscriber = async (req, res) => {
    try {
        const {email} = req.body
        const SubscriberDetails = new SubscriberModel({email})
        const savedSubscriber = await SubscriberDetails.save()
        res.status(201).redirect('/')
    }
    catch(err) {
        console.log(err)
    }
}

const handleSignup = async (req, res) => {
    try {
        const {firstname, lastname, email, password, tel, address} = req.body
        const userExit = await SignupModel.findOne({ email })
        if(userExit) {
            throw new Error("user with this email address already exist")
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new SignupModel({
            firstname, 
            lastname,
            email,
            password: hashedPassword,
            tel,
            address,
            accountNum: genAccountNumber()
        })
        const savedUser = await newUser.save()
        res.status(201).redirect('/login-page')
    }
    catch(err) {
        console.log(err)
        res.status(400).json({
            success: false,
            msg: err.message
        })
    }
    
}

const period = 60 * 60 * 24
const handleLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        const userExist = await SignupModel.findOne({ email })
        if(userExist) {
            const correctPassword = await bcrypt.compare(password, userExist.password)
            if(correctPassword) {
                await jwt.sign({id: userExist.id}, process.env.JWT_SECRET, {expiresIn: period}, 
                    async (err, token) => {
                        if(err) {
                            throw new Error(err.message)
                        }
                        await res.cookie("userToken", token, {maxAge: 1000 * period, httpOnly: true})
                        res.status(200).json({
                            success: true,
                            userExist,
                            msg: "User logged in successfully"
                        })
                    })
            }
            else {
                throw new Error("Incorrect password")
            }
        }
        else {
            throw new Error("Incorrect email")
        }
    }
    catch(err)
    {
        console.log(err)
        let error = handleErrorFunc(err)
        res.status(400).json({
            success: false,
            error
        })
    }
}


module.exports = { 
    handleBlogPost, 
    handleContactPost, 
    handleSubscriber, 
    handleSignup, 
    handleLogin
};
