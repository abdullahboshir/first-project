import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // `true` for port 465, `false` for all other ports
    auth: {
      user: 'samiunnur20166@gmail.com',
      pass: 'cwzd zvtf xtmm mrnz',
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: 'samiunnur20166@gmail.com', // sender address
    to, // list of receivers
    subject: 'Hello ✔, what is up?', // Subject line
    text: 'Forgot Your password within 10 minutes!', // plain text body
    html, // html body
  });
};
