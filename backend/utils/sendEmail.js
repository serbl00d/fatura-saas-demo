const nodemailer = require("nodemailer");

const sendEmailWithAttachment = async (
  to,
  subject,
  text,
  attachmentBuffer,
  filename
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Fatura Sistemi" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    attachments: [
      {
        filename,
        content: attachmentBuffer,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmailWithAttachment;
