const Joi = require('joi');

const serviceValidation = Joi.object({
  service_name: Joi.string().required().messages({
    'string.base': 'Service name must be a string.',
    'string.empty': 'Service name cannot be an empty.',
    'any.required': 'Service name is a required field.',
  }),
  service_description: Joi.string().required().messages({
    'string.base': 'Service description must be a string.',
    'string.empty': 'Service description cannot be empty.',
    'any.required': 'Service description is a required field.',
  }),
  images: Joi.object().required().messages({
    'object.base': 'Images must be string.',
    'object.required': 'Images are required field',
  }),
  sub_service: Joi.array().optional().messages({
    'array.base': 'Sub services must be an array',
  }),
  service_approach: Joi.array().optional().messages({
    'array.base': 'Services approach must be an array',
  }),
  service_atc: Joi.array().optional().messages({
    'array.base': 'Service ATC must be an array',
  }),
  service_benefit: Joi.array().optional().messages({
    'array.base': 'Service benefit must be an array',
  }),
  service_consulting: Joi.array().optional().messages({
    'array.base': 'Service consulting must be an array',
  }),
});

const updateService = Joi.object({
  service_name: Joi.string().optional().messages({
    'string.base': 'Service name must be a string.',
    'string.empty': 'Service name cannot be an empty.',
  }),
  service_description: Joi.string().optional().messages({
    'string.base': 'Service description must be a string.',
    'string.empty': 'Service description cannot be empty.',
  }),
  images: Joi.object().required().messages({
    'object.base': 'Images are required field.',
  }),
  sub_service: Joi.array().optional().messages({
    'array.base': 'Sub services must be an array',
  }),
  service_approach: Joi.array().optional().messages({
    'array.base': 'Services approach must be an array',
  }),
  service_atc: Joi.array().optional().messages({
    'array.base': 'Service ATC must be an array',
  }),
  service_benefit: Joi.array().optional().messages({
    'array.base': 'Service benefit must be an array',
  }),
  service_consulting: Joi.array().optional().messages({
    'array.base': 'Service consulting must be an array',
  }),
});

module.exports = { serviceValidation, updateService };
