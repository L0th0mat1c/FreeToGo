import nodemailer from 'nodemailer';

const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (mail:string, name:string) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "freetogo.welcome@gmail.com",
      pass:  process.env.MAIL_PASSWORD, 
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FreeToGo" <freetogo.welcome@gmail.com>', // sender address
    to: mail, // list of receivers
    subject: "Your inscription", // Subject line
    attachDataUrls: true,//to accept base64 content in messsage
    html: "Thanks for using FreeToGo, "+name+". You can access all of the recipes and functionalities of our application. Don't forget to use our mobile client.", // html body   
  }).then(function() {
      console.log('Message sent');
  })
  .catch(function(err) {
      console.log('error: ', err);
  });

  //console.log("Message sent: %s", info.messageId);

}


export const passwordReset = async (mail:string, name:string, token:string) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "freetogo.welcome@gmail.com",
      pass:  process.env.MAIL_PASSWORD, 
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FreeToGo" <freetogo.welcome@gmail.com>', // sender address
    to: mail, // list of receivers
    subject: "New password request", // Subject line
    //attachDataUrls: true,//to accept base64 content in messsage
    html: "Dear "+name+",<p>You requested for a password reset, kindly use this <a href=http://localhost:8080/#/passwordReset/"+token+">link</a> to reset your password</p>", // html body   
  }).then(function() {
      console.log('Message sent');
  })
  .catch(function(err) {
      console.log('error: ', err);
  });

  //console.log("Message sent: %s", info.messageId);

}