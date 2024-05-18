function handleErrorFunc(err) {
    let errors = {email: "", password: ""}
    if(err.message === "Incorrect email") {
        errors.email = "You have entered an incorrect email address"
        return errors
    }
    if(err.message === "Incorrect password") {
        errors.password = "You have entered an incorrect password"
        return errors
    }

    return errors
}


module.exports = {handleErrorFunc}