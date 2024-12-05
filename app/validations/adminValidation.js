const Joi = require('joi');

const adminValidation = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email cannot be empty.',
    'any.required': 'Email is a required field.',
    'string.email': 'Email must be a valid email address.',
  }),
  password: Joi.string()
    .pattern(new RegExp('^[A-Z][a-zA-Z0-9!@#$%&*.]{7,}$'))
    .required()
    .messages({
      'string.pattern.base':
        'Password must start with capital latter and must be at least 8 character long.',
      'string.empty': 'Password cannot be empty.',
      'any.required': 'Password is a required field.',
    }),
});

module.exports = { adminValidation };
