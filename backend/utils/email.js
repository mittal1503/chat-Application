const nodemailer = require('nodemailer');

const mailer = (email,verificationLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER1,
      pass: process.env.PASSWORD,
    },
  });

  // send mail with defined transport object
  transporter.sendMail(
    {
      from: 'hatvanimittal@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Verify Your Email Address',
      html: `<p>Welcome to our System!</p>
                    <p>Please click the following link to verify your email address:</p>
                     <a href="${verificationLink}">Verify Email</a>
                     <p>If you did not sign up for an account, you can safely ignore this email.</p>
                    <p>Best regards,</p>
                   <p>Mittal Hatvani</p>`
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent : ' + info.response);
      }
    }
  );
};

module.exports = mailer;
