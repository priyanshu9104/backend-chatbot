// const nodemailer = require("nodemailer");

// const sendEmail = async (to, subject, text) => {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'dereck.yost99@ethereal.email',
//         pass: 'xg1hFSAYBXkyBtUwuA'
//     }
// });

//   // const mailOptions = {
//   //   from: process.env.EMAIL,
//   //   to,
//   //   subject,
//   //   text,
//   // };


//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch 👻" <dereck.yost99@ethereal.email>', // sender address
//     to: to, // list of receivers
//     subject: subject, // Subject line
//     text: text, // plain text body
//     html: "<b>Forget Password message</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);

//   // await transporter.sendMail(mailOptions);
// };

// module.exports = { sendEmail };















const sgMail = require('@sendgrid/mail');
require('dotenv').config();




const sendMail = async (to, subject, text) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  try {
    const msg = {
      to: to,
      from: {
        name: "Acadmico ERP",
        email: process.env.EMAIL // Use the email address or domain you verified above
      },
      subject: `Sending your ${subject}`,
      text: `Hi There is  ${text}`,
      html: `<div>
        <h2>Hi,</h2>
        <section>
        <h3> There is ${text}</h3>
        </section>
      </div>`,
    };
    await sgMail.send(msg);
    // console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendMail };