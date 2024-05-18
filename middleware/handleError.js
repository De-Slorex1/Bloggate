const { HandleError } = require("../utils/errors")

function ErrorHandler(error, req, res, next) {
    let errors = {email: "", password: ""}
    if(error instanceof HandleError) {
        if(error.message == "Incorrect email") {
            errors.email = "You have entered an incorrect email address"
            return res.status(400).json({
                success: false,
                error: errors
            })
        }
        if(error.message == "Incorrect password") {
            errors.email = "You have entered an incorrect email address"
            return res.status(400).json({
                success: false,
                error: errors
            })
        }
    } else {
        console.log("show this message if the codes are not working")
    }

    return res.status(400).json({
        success: false,
        error: err.message
    })
}

module.exports = {ErrorHandler}