const adminRouter = require('express').Router()
const { handleBlogPost, handleContactPost, handleSubscriber, handleSignup, handleLogin} = require('../controller/adminController');


adminRouter.post('/post-blogs', handleBlogPost)
adminRouter.post('/post-contacts', handleContactPost)
adminRouter.post('/subcribe-post', handleSubscriber)
adminRouter.post('/signup-user', handleSignup)
adminRouter.post('/login-user', handleLogin)



// adminRouter.get('/update-password/:id/:token', handleUpdatePassword)



module.exports = adminRouter;