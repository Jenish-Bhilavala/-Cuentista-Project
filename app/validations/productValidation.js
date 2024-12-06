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
  image: Joi.object().required().messages({
    'object.base': 'Image is a required field.',
  }),
  contact: Joi.string().required().messages({
    'string.base': 'Contact must be a string.',
    'string.empty': 'Contact cannot be empty.',
    'any.required': 'Contact is a required field.',
  }),
});
