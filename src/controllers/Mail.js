const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
    async send(recipient,assunt,body) {

        const user = process.env.NODE_MAIL;
        const pass = process.env.NODE_MAIL_PASSWORD;

        const transport = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: user,
                pass: pass
            }
        });

        const response = await transport.sendMail({
            from: `Desafio <${user}>` ,
            to: recipient,
            subject: assunt ,
            text: body,
        }).then(message => {
            return message;
        }).catch(error => {
            return error;
        });

        return response;
    }
}