const Joi = require('joi');

const productValidation = Joi.object({
  product_name: Joi.string().required().messages({
    'string.base': 'Product name must be a string.',
    'string.empty': 'Product name cannot be empty.',
    'any.required': 'Product name is a required field.',
  }),
  product_description: Joi.string().required().messages({
    'string.base': 'Product description must be a string.',
    'string.empty': 'Product description cannot ne empty.',
    'any.required': 'Product name is a required field.',
  }),
  images: Joi.object().required().messages({
    'object.base': 'Image is a required field.',
  }),
  contact: Joi.string().required().messages({
    'string.base': 'Contact must be a string.',
    'string.empty': 'Contact cannot be empty.',
    'any.required': 'Contact is a required field.',
  }),
  expertise: Joi.array().optional(),
  methodology: Joi.array().optional(),
  product_service: Joi.array().optional(),
  productBenefit: Joi.array().optional(),
});

const updateProduct = Joi.object({
  product_name: Joi.string().optional().messages({
    'string.base': 'Product name must be a string.',
    'string.empty': 'Product name cannot be empty.',
  }),
  product_description: Joi.string().optional().messages({
    'string.base': 'Product description must be a string.',
    'string.empty': 'Product description cannot ne empty.',
  }),
  images: Joi.object().optional().messages({
    'object.base': 'Image is a required field.',
  }),
  contact: Joi.string().optional().messages({
    'string.base': 'Contact must be a string.',
    'string.empty': 'Contact cannot be empty.',
  }),
  expertise: Joi.array().optional(),
  methodology: Joi.array().optional(),
  product_service: Joi.array().optional(),
  productBenefit: Joi.array().optional(),
});

module.exports = { productValidation, updateProduct };
