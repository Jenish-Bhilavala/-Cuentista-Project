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
    'object.base': 'Images are required field.',
  }),
  sub_service: Joi.array().optional(),
  service_approach: Joi.array().optional(),
  service_atc: Joi.array().optional(),
  service_benefit: Joi.array().optional(),
  service_consulting: Joi.array().optional(),
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
  sub_service: Joi.array().optional(),
  service_approach: Joi.array().optional(),
  service_atc: Joi.array().optional(),
  service_benefit: Joi.array().optional(),
  service_consulting: Joi.array().optional(),
});

module.exports = { serviceValidation, updateService };
