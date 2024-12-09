const productModel = require('../models/productModel');
const message = require('../utils/message');
const HandleResponse = require('../services/errorHandler');
const { StatusCodes } = require('http-status-codes');
const { response } = require('../utils/enum');
const { logger } = require('../logger/logger');
const {
  productValidation,
  updateProduct,
} = require('../validations/productValidation');

module.exports = {
  addProduct: async (req, res) => {
    try {
      const {
        contact,
        expertise,
        methodology,
        product_description,
        images,
        product_name,
        product_service,
        productBenefit,
      } = req.body;
      const { error } = productValidation.validate(req.body);

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

      const findProduct = await productModel.findOne({ product_name });

      if (findProduct) {
        logger.error(`Product ${message.ALREADY_EXISTS}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.BAD_REQUEST,
            `Product ${message.ALREADY_EXISTS}`,
            undefined
          )
        );
      }

      const newProduct = new productModel({
        contact,
        expertise,
        methodology,
        product_description,
        images,
        product_name,
        product_service,
        productBenefit,
      });

      const savedProduct = await newProduct.save();

      logger.info(`Product ${message.ADDED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(response.SUCCESS, StatusCodes.CREATED, undefined, {
          _id: savedProduct._id,
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

  viewProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const findProduct = await productModel.findById(id);

      if (!findProduct) {
        logger.error(`Product ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Product ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      logger.info(`Product ${message.RETRIEVED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(response.SUCCESS, StatusCodes.OK, undefined, findProduct)
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

  getProductList: async (req, res) => {
    try {
      const listProduct = await productModel.find().select('_id, product_name');

      if (!listProduct) {
        logger.error(`Product ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Product ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      logger.info(`Product ${message.RESOLVED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(response.SUCCESS, StatusCodes.OK, undefined, listProduct)
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
  listOfProduct: async (req, res) => {
    try {
      const { page, limit, sortBy, orderBy, searchTerm } = req.body;
      const pageNumber = parseInt(page, 10) || 1;
      const pageLimit = parseInt(limit, 10) || 10;
      const pipeline = [];

      if (searchTerm) {
        pipeline.push({
          $match: { product_name: { $regex: searchTerm, $options: 'i' } },
        });
      }

      const sortOrder = orderBy === 'ASC' ? 1 : -1;

      pipeline.push({
        $sort: { [sortBy]: sortOrder },
      });

      const productData = await productModel.aggregate(pipeline);
      const count = productData.length || 0;

      pipeline.push(
        { $skip: (pageNumber - 1) * pageLimit },
        { $limit: pageLimit }
      );

      const listOfProduct = await productModel.aggregate(pipeline);

      if (listOfProduct.length === 0) {
        logger.error(`Product ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Product ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      logger.info(`Product ${message.RETRIEVED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(response.SUCCESS, StatusCodes.OK, undefined, {
          listOfProduct,
          totalCount: count,
          itemsCount: listOfProduct?.length,
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

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const productData = req.body;
      const { error } = updateProduct.validate(productData);

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

      const findProduct = await productModel.findById(id);

      if (!findProduct) {
        logger.error(`Product ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Product ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      await productModel.updateOne({ _id: id }, { $set: productData });

      logger.info(`Product ${message.UPDATED_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(
          response.SUCCESS,
          StatusCodes.ACCEPTED,
          `Profile ${message.UPDATED_SUCCESSFULLY}`,
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

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const findProduct = await productModel.findByIdAndDelete(id);

      if (!findProduct) {
        logger.error(`Product ${message.NOT_FOUND}`);
        return res.json(
          HandleResponse(
            response.ERROR,
            StatusCodes.NOT_FOUND,
            `Product ${message.NOT_FOUND}`,
            undefined
          )
        );
      }

      logger.info(`Product ${message.DELETE_SUCCESSFULLY}`);
      return res.json(
        HandleResponse(
          response.SUCCESS,
          StatusCodes.OK,
          `Product ${message.DELETE_SUCCESSFULLY}`,
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
