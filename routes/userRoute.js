const userRouter = require('express').Router()

const {
    handleHome, 
    handleBlogs, 
    handleAdmin, 
    handleAbout, 
    handleContact, 
    handleSingleView, 
    handleError, 
    signupHandler,
    logout,
    loginHandler,
    resetPasswordEmall,
    postResetPasswordEmail,
    getUpdatePassword,
    postUpdatedPassword,
    } = require('../controller/userController')
const { verifiedUser } = require('../middleware/authUser')
const SignupModel = require('../model/signup')


userRouter.get('/', handleHome)
userRouter.get('/blog', handleBlogs)
userRouter.get('/admin', verifiedUser, handleAdmin)
userRouter.get('/about', handleAbout)
userRouter.get('/contact', handleContact)
userRouter.get('/single-view/:id', handleSingleView)
userRouter.get('/signup-page', signupHandler)
userRouter.get('/login-page', loginHandler)
userRouter.get('/logout', logout)
userRouter.get('/reset-password-page', resetPasswordEmall)
userRouter.post('/submitted-email', postResetPasswordEmail)
userRouter.get('/update-password/:id/:token', getUpdatePassword)
userRouter.put('/update-password/:id/:token', postUpdatedPassword)
userRouter.get('*', handleError)



module.exports = userRouter;