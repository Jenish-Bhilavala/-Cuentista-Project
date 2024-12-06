const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel');
const HandleResponse = require('../services/errorHandler');
const message = require('../utils/message');
const { response } = require('../utils/enum');
const { logger } = require('../logger/logger');
const { StatusCodes } = require('http-status-codes');
const { adminValidation } = require('../validations/adminValidation');

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
        logger.error(`Admin ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Admin ${message.NOT_FOUND}`,
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

      logger.info(message.LOGIN_SUCCESSFULLY);
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
};
