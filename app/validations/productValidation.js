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
    'object.base': 'Image must be a string.',
    'object.required': 'Image is a required field.',
  }),
  contact: Joi.string().required().messages({
    'string.base': 'Contact must be a string.',
    'string.empty': 'Contact cannot be empty.',
    'any.required': 'Contact is a required field.',
  }),
  expertise: Joi.array().optional().messages({
    'array.base': 'Expertise must be an array.',
  }),
  methodology: Joi.array().optional().messages({
    'array.base': 'Methodology must be an array.',
  }),
  product_service: Joi.array().optional().messages({
    'array.base': 'Product service must be an array.',
  }),
  product_benefit: Joi.array().optional().messages({
    'array.base': 'Product benefit must be an array.',
  }),
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
    'object.base': 'Image must be a string.',
  }),
  contact: Joi.string().optional().messages({
    'string.base': 'Contact must be a string.',
    'string.empty': 'Contact cannot be empty.',
  }),
  expertise: Joi.array().optional().messages({
    'array.base': 'Expertise must be an array.',
  }),
  methodology: Joi.array().optional().messages({
    'array.base': 'Methodology must be an array.',
  }),
  product_service: Joi.array().optional().messages({
    'array.base': 'Product service must be an array.',
  }),
  product_benefit: Joi.array().optional().messages({
    'array.base': 'Product benefit must be an array.',
  }),
});

module.exports = { productValidation, updateProduct };
