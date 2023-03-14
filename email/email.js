const nodemailer = require('nodemailer');


const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: 'Tmax Event < events@tmaxevents.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: options.html
    };

  await  transporter.sendMail(mailOptions);
}


module.exports = sendEmail;