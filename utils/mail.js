const nodemailer = require('nodemailer')

async function sendMail(email, header, body) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: process.env.NODE_EMAIL,
                pass: process.env.NODE_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.NODE_EMAIL,
            to: email,
            subject: header,
            text: body
        })
    }
    catch(err) {
        console.log(err)
        console.log("message not sent")
    }
}

module.exports = {sendMail}