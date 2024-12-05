const message = require('./message');
const HandleResponse = require('../services/errorHandler');
const { StatusCodes } = require('http-status-codes');
const { response } = require('./enum');
const { logger } = require('../logger/logger');

module.exports = {
  globalRoute: (req, res) => {
    logger.error(message.METHOD_NOT_ALLOWED);
    return res.json(
      HandleResponse(
        response.ERROR,
        StatusCodes.METHOD_NOT_ALLOWED,
        message.METHOD_NOT_ALLOWED,
        undefined
      )
    );
  },
};
