const inquiryModel = require('../models/inquiryModel');
const messages = require('../utils/message');
const HandleResponse = require('../services/errorHandler');
const { response, status } = require('../utils/enum');
const { logger } = require('../logger/logger');
const { StatusCodes } = require('http-status-codes');
const { inquiryValidation } = require('../validations/inquiryValidation');
const { sendMail } = require('../services/email');

module.exports = {
  createInquiry: async (req, res) => {
    try {
      const { first_name, last_name, email, phone, message } = req.body;
      const { error } = inquiryValidation.validate(req.body);

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

      const createInquiry = new inquiryModel({
        first_name,
        last_name,
        email,
        phone,
        message,
      });

      await createInquiry.save();

      await sendMail(email, first_name, last_name, phone, message);

      logger.info(`Inquiry ${messages.ADDED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(
          response.SUCCESS,
          StatusCodes.CREATED,
          `Inquiry ${messages.ADDED_SUCCESSFULLY}`,
          { id: createInquiry._id }
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

  listOfInquiry: async (req, res) => {
    try {
      const { page, limit, sortBy, orderBy, searchTerm } = req.body;
      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = parseInt(limit, 10) || 10;
      const pipeline = [];

      if (searchTerm) {
        pipeline.push({
          $match: {
            $or: [
              { first_name: { $regex: searchTerm, $options: 'i' } },
              { last_name: { $regex: searchTerm, $options: 'i' } },
            ],
          },
        });
      }

      const sortOrder = orderBy === 'ASC' ? 1 : -1;

      pipeline.push({
        $sort: { [sortBy]: sortOrder },
      });

      const inquiryData = await inquiryModel.aggregate(pipeline);
      const count = inquiryData.length || 0;

      pipeline.push(
        { $skip: (pageNumber - 1) * limitNumber },
        { $limit: limitNumber }
      );
      const listOfInquiry = await inquiryModel.aggregate(pipeline);

      if (listOfInquiry.length === 0) {
        logger.error(`Inquiry ${messages.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Inquiry ${messages.NOT_FOUND}`,
            undefined
          )
        );
      }

      logger.info(`Inquiry ${messages.RETRIEVED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(response.SUCCESS, StatusCodes.OK, undefined, {
          listOfInquiry,
          totalCount: count,
          ItemsCount: listOfInquiry?.length,
          currentPage: page,
          totalPage: count / limit,
          pageSize: limit,
        })
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

  updateInquiry: async (req, res) => {
    try {
      const { id } = req.params;
      const findInquiry = await inquiryModel.findById(id);

      if (!findInquiry) {
        logger.error(`Inquiry ${messages.NOT_FOUND}`);
        return res.send(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Inquiry ${messages.NOT_FOUND}`,
            undefined
          )
        );
      }

      if (findInquiry.status === status.RESOLVE) {
        logger.error(`Inquiry ${messages.ALREADY_RESOLVED}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.BAD_REQUEST,
            messages.ALREADY_RESOLVED,
            undefined
          )
        );
      }
      await findInquiry.updateOne({ status: status.RESOLVE });

      logger.info(`Inquiry ${messages.RESOLVED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(
          response.SUCCESS,
          StatusCodes.ACCEPTED,
          messages.RESOLVED_SUCCESSFULLY,
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
