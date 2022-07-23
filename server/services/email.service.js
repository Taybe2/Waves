const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config;

let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const registerEmail = async(useremail, user) => {
    try {
        const emailToken = user.generateRegisterToken();

        let mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Waves guitars",
                link: `${process.env.EMAIL_mAIL_URL}`
            }
        });

        const email = {
            body: {
                name: useremail,
                intro: 'Welcome to Waves! We are very excited to have you on board.',
                action: {
                    instructions: 'To validate your account, pleace click here: ',
                    button: {
                        color: '#1a73e8',
                        text: 'Validate your account',
                        link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`
                    }
                },
                outro: 'Need help, or hve questions? Just reply to this email, we\'d love to help.'
            }
        }

        let emailBody = mailGenerator.generate(email);
        let message = {
            from : process.env.EMAIL,
            to: useremail,
            subject: "Welcome to Waves",
            html: emailBody
        };

        await transporter.sendMail(message);
        return true;

    } catch(error) {
        throw error;
    }
};

const changeEmail = async(useremail, user) => {
    try {
        const emailToken = user.generateRegisterToken();

        let mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Waves guitars",
                link: `${process.env.EMAIL_MAIL_URL}`
            }
        });

        const email = {
            body: {
                name: useremail,
                intro: 'Is this your new email?',
                action: {
                    instructions: 'To verify your new email, pleace click here: ',
                    button: {
                        color: '#1a73e8',
                        text: 'Verify Email',
                        link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`
                    }
                },
                outro: 'Need help, or hve questions? Just reply to this email, we\'d love to help.'
            }
        }

        let emailBody = mailGenerator.generate(email);
        let message = {
            from : process.env.EMAIL,
            to: useremail,
            subject: "Waves - email change request",
            html: emailBody
        };

        await transporter.sendMail(message);
        return true;

    } catch(error) {
        throw error;
    }
};

module.exports = {
    registerEmail,
    changeEmail
};