const serviceModel = require('../models/serviceModel');
const HandleResponse = require('../services/errorHandler');
const message = require('../utils/message');
const { logger } = require('../logger/logger');
const { response } = require('../utils/enum');
const { StatusCodes } = require('http-status-codes');
const {
  serviceValidation,
  updateService,
} = require('../validations/serviceValidation');

module.exports = {
  addService: async (req, res) => {
    try {
      const {
        service_name,
        service_description,
        images,
        sub_service,
        service_approach,
        service_atc,
        service_benefit,
        service_consulting,
      } = req.body;
      const { error } = serviceValidation.validate(req.body);

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

      const findService = await serviceModel.findOne({ service_name });
      if (findService) {
        logger.error(`Service ${message.ALREADY_EXISTS}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.BAD_REQUEST,
            `Service ${message.ALREADY_EXISTS}`,
            undefined
          )
        );
      }

      const newService = new serviceModel({
        service_name,
        service_description,
        images,
        sub_service,
        service_approach,
        service_atc,
        service_benefit,
        service_consulting,
      });

      const savedService = await newService.save();

      logger.info(`Service ${message.ADDED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(
          response.SUCCESS,
          StatusCodes.CREATED,
          { id: savedService._id },
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

  viewService: async (req, res) => {
    try {
      const { id } = req.params;
      const findService = await serviceModel.findById(id);

      if (!findService) {
        logger.error(`Service ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Service ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      logger.info(`Service ${message.RETRIEVED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(response.SUCCESS, StatusCodes.OK, undefined, {
          findService,
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

  getServiceList: async (req, res) => {
    try {
      const getServiceList = await serviceModel
        .find()
        .select('_id, service_name');

      if (!getServiceList) {
        logger.error(`Service ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Service ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      logger.info(`Service ${message.RETRIEVED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(
          response.SUCCESS,
          StatusCodes.OK,
          undefined,
          getServiceList
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

  listOfService: async (req, res) => {
    try {
      const { page, limit, sortBy, orderBy, searchTerm } = req.body;
      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = parseInt(limit, 10) || 10;
      const pipeline = [];

      if (searchTerm) {
        pipeline.push({
          $match: { service_name: { $regex: searchTerm, $options: 'i' } },
        });
      }

      const sortOrder = orderBy === 'ASC' ? 1 : -1;

      pipeline.push({
        $sort: { [sortBy]: sortOrder },
      });

      const serviceData = await serviceModel.aggregate(pipeline);
      const count = serviceData.length || 0;

      pipeline.push(
        { $skip: (pageNumber - 1) * limitNumber },
        { $limit: limitNumber }
      );

      const listOfService = await serviceModel.aggregate(pipeline);

      if (listOfService.length === 0) {
        logger.error(`Service ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Service ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      logger.info(`Service ${message.RETRIEVED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(response.SUCCESS, StatusCodes.OK, undefined, {
          listOfService,
          totalCount: count,
          itemsCount: listOfService?.length,
          currentPage: page,
          totalPage: count / limit,
          pageLimit: limit,
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

  updateService: async (req, res) => {
    try {
      const { id } = req.params;
      const serviceData = req.body;
      const { error } = updateService.validate(serviceData);
      const findService = await serviceModel.findById(id);

      if (!findService) {
        logger.error(`Service ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Service ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      await serviceModel.updateOne(serviceData);

      logger.info(`Service ${message.UPDATED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(
          response.SUCCESS,
          StatusCodes.ACCEPTED,
          `Service ${message.UPDATED_SUCCESSFULLY}`,
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

  deleteService: async (req, res) => {
    try {
      const { id } = req.params;
      const findService = await serviceModel.findById(id);

      if (!findService) {
        logger.error(`Service ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Service ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      await serviceModel.deleteOne(findService);

      logger.info(`Service ${message.DELETE_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(
          response.SUCCESS,
          StatusCodes.OK,
          `Service ${message.DELETE_SUCCESSFULLY}`,
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
