const jwt = require("jsonwebtoken")

async function verifiedUser(req, res, next) {
    try {
        let  token = req.cookies.userToken
        await jwt.verify(token, process.env.JWT_SECRET, (err, verifiedToken) => {
            if(verifiedToken) {
                next()
            }
            res.redirect('/login-page')
        })
    }
    catch(err) {
        console.log(err.message)
    }
}

module.exports = {verifiedUser}