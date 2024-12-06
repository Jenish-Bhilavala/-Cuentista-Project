const Joi = require('joi');

const inquiryValidation = Joi.object({
  first_name: Joi.string().required().messages({
    'string.base': 'First name must be a string.',
    'string.empty': 'First name cannot be empty.',
    'any.required': 'First name is a required field.',
  }),
  last_name: Joi.string().required().messages({
    'string.base': 'Last name must be a string.',
    'string.empty': 'Last name cannot be empty.',
    'any.required': 'Last name is a required field.',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email cannot be empty.',
    'any.required': 'Email is a required field.',
    'string.email': 'Email must be a valid email address.',
  }),
  phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required().messages({
    'string.pattern.base': 'Phone must be exactly 10 digits.',
    'string.empty': 'Phone cannot be empty.',
    'any.required': 'Phone is a required field.',
  }),
  message: Joi.string().required().messages({
    'string.base': 'Message must be a string.',
    'string.empty': 'Message cannot be empty.',
    'any.required': 'Message is a required field.',
  }),
});

module.exports = {
  inquiryValidation,
};
