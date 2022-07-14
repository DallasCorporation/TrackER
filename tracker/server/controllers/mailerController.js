
const asyncHandler = require('express-async-handler')
var nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const testMail = asyncHandler(async (req, res) => {
    const mailOptions = {
        from: 'do-not-reply@tracker.com', // Sender address
        to: 'lelecesena99@gmail.com', // List of recipients
        subject: 'Node Mailer', // Subject line
        text: 'Hello People!, Welcome to Bacancy!', // Plain text body
    };

    transport.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
})

module.exports = {
    testMail,
}