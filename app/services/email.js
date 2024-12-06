const nodemailer = require('nodemailer');
const crypto = require('crypto');
const HandleResponse = require('../services/errorHandler');
const { response } = require('../utils/enum');
const { StatusCodes } = require('http-status-codes');
const { logger } = require('../logger/logger');
require('dotenv').config();

const transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.USER_PASS,
  },
});

const sendMail = async (email, firstName, lastName, phone, messageContent) => {
  const mailOption = {
    to: email,
    subject: 'Inquiry received',
    html: `
    <p>Dear ${firstName} ${lastName},</p>
      <p>Thank you for your inquiry! We have received the following details:</p>
      <ul>
        <li><strong>Name:</strong> ${firstName} ${lastName}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Message:</strong> ${messageContent}</li>
      </ul>
      <p>Our team will get back to you shortly.</p>
      <p>Best regards,</p>
      <p>CUENTISTA</p>
    `,
  };
  try {
    await transport.sendMail(mailOption);
  } catch (error) {
    logger.error(error.message);
    return res.json(
      HandleResponse(
        response.ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message || error,
        undefined
      )
    );
  }
};

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const verifyEmail = async (email, otp) => {
  const mailOption = {
    to: email,
    subject: 'Email verification OTP',
    html: `
    <p>Your OTP is <strong>${otp}</strong></p>
    <p>Please do not share it with anyone.</p>
    <p>OTP will expire in 5 minutes.</p>
    `,
  };
  try {
    await transport.sendMail(mailOption);
  } catch (error) {
    return res.json(
      HandleResponse(
        response.ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message || error,
        undefined
      )
    );
  }
};
module.exports = { sendMail, verifyEmail, generateOTP };
