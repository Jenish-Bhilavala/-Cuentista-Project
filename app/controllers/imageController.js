const { StatusCodes } = require('http-status-codes');
const HandleResponse = require('../services/errorHandler');
const { response } = require('../utils/enum');

module.exports = {
  uploadFile: (req, res) => {
    try {
      const image = req.file ? req.file.filename : null;

      return res.json(
        HandleResponse(response.SUCCESS, StatusCodes.OK, undefined, image)
      );
    } catch (error) {
      logger.error(error.message || error);
      return res.json(
        HandleResponse(
          response.ERROR,
          StatusCodes.INTERNAL_SERVER_ERROR,
          undefined
        )
      );
    }
  },
};
