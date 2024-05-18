class HandleError extends Error{
    constructor(errorcode, message, statuscode) {
        super(message) 
        this.errorcode = errorcode
        this.statuscode = statuscode
    }
}

module.exports = {HandleError}