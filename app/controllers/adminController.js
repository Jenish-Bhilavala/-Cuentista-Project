const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');
const adminModel = require('../models/adminModel');
const otpModel = require('../models/otpModel');
const HandleResponse = require('../services/errorHandler');
const message = require('../utils/message');
const { response } = require('../utils/enum');
const { logger } = require('../logger/logger');
const { StatusCodes } = require('http-status-codes');
const { generateOTP, verifyEmail } = require('../services/email');
const {
  adminValidation,
  adminVerification,
  changePassword,
  forgotPassword,
} = require('../validations/adminValidation');

module.exports = {
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const { error } = adminValidation.validate(req.body);

      if (error) {
        logger.error(error.details[0].message);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.BAD_REQUEST,
            error.details[0].message,
            undefined
          )
        );
      }

      const findAdmin = await adminModel.findOne({ email });

      if (!findAdmin) {
        logger.error(`Admin profile ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Admin profile ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        findAdmin.password
      );

      if (!isPasswordMatch) {
        logger.error(message.INVALID_PASSWORD);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.BAD_REQUEST,
            message.INVALID_PASSWORD,
            undefined
          )
        );
      }

      const token = jwt.sign(
        {
          _id: findAdmin._id,
          email: findAdmin.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE_IN }
      );

      logger.info(`You ${message.LOGIN_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(
          response.SUCCESS,
          StatusCodes.OK,
          message.LOGIN_SUCCESSFULLY,
          { token }
        )
      );
    } catch (error) {
      logger.error(error.message || error);
      return res.json(
        HandleResponse(
          response.ERROR,
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message || error,
          undefined
        )
      );
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { email } = req.body;
      const { error } = adminVerification.validate(req.body);

      if (error) {
        logger.error(error.details[0].message);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.BAD_REQUEST,
            error.details[0].message,
            undefined
          )
        );
      }

      const findAdmin = await adminModel.findOne({ email });

      if (!findAdmin) {
        logger.error(`Admin profile ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Admin profile ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      const otp = generateOTP();
      const expire_at = moment().add(5, 'minutes').format();
      const addOTP = new otpModel({
        email,
        otp,
        expire_at,
      });

      await addOTP.save();
      await verifyEmail(email, otp);

      logger.info(message.OTP_SENT_SUCCESSFULLY);
      return res.json(
        HandleResponse(
          response.SUCCESS,
          StatusCodes.OK,
          message.OTP_SENT_SUCCESSFULLY,
          { otp }
        )
      );
    } catch (error) {
      logger.error(error.message || error);
      return res.json(
        HandleResponse(
          response.ERROR,
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message || error,
          undefined
        )
      );
    }
  },

  changePassword: async (req, res) => {
    try {
      const { email, current_password, new_password, confirm_password } =
        req.body;
      const { error } = changePassword.validate(req.body);

      if (error) {
        logger.error(error.details[0].message);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.BAD_REQUEST,
            error.details[0].message,
            undefined
          )
        );
      }

      const findAdmin = await adminModel.findOne({ email });

      if (!findAdmin) {
        logger.error(`Admin profile ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Admin profile ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      const comparePassword = await bcrypt.compare(
        current_password,
        findAdmin.password
      );

      if (!comparePassword) {
        logger.error(message.PASSWORD_NOT_MATCH);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.BAD_REQUEST,
            message.PASSWORD_NOT_MATCH,
            undefined
          )
        );
      }

      const hashedPassword = await bcrypt.hash(new_password, 10);
      await findAdmin.updateOne({ password: hashedPassword });

      logger.info(`Password ${message.UPDATED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(
          response.SUCCESS,
          StatusCodes.ACCEPTED,
          `Password ${message.UPDATED_SUCCESSFULLY}`,
          undefined
        )
      );
    } catch (error) {
      logger.error(error.message || error);
      return res.json(
        HandleResponse(
          response.ERROR,
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message || error,
          undefined
        )
      );
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email, otp, new_password, confirm_password } = req.body;
      const { error } = forgotPassword.validate(req.body);

      if (error) {
        logger.error(error.details[0].message);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.BAD_REQUEST,
            error.details[0].message,
            undefined
          )
        );
      }

      const findAdmin = await adminModel.findOne({ email });

      if (!findAdmin) {
        logger.error(`Admin profile ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Admin profile ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      const findOTP = await otpModel.findOne({ otp });

      if (!findOTP) {
        logger.error(`OTP ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `OTP ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      const hashedPassword = await bcrypt.hash(new_password, 10);
      await adminModel.updateOne(
        { email: findAdmin.email },
        { $set: { password: hashedPassword } }
      );

      logger.info(`Password ${message.UPDATED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(
          response.SUCCESS,
          StatusCodes.ACCEPTED,
          `Password ${message.UPDATED_SUCCESSFULLY}`,
          undefined
        )
      );
    } catch (error) {
      logger.error(error.message || error);
      return res.json(
        HandleResponse(
          response.ERROR,
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message || error,
          undefined
        )
      );
    }
  },
};
