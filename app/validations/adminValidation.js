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

const adminVerification = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email cannot be empty.',
    'any.required': 'Email is a required field.',
    'string.email': 'Email must be a valid email address.',
  }),
});

const changePassword = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email cannot be empty.',
    'any.required': 'Email is a required field.',
    'string.email': 'Email must be a valid email address.',
  }),
  current_password: Joi.string()
    .pattern(new RegExp('^[A-Z][a-zA-Z0-9!@#$%&*.]{7,}$'))
    .required()
    .messages({
      'string.pattern.base':
        'Current password must start with a capital latter and must be at least 8 characters long.',
      'string.empty': 'Current password cannot be empty.',
      'any.required': 'Current password must be required.',
    }),
  new_password: Joi.string()
    .pattern(new RegExp('^[A-Z][a-zA-Z0-9!@#$%&*.]{7,}$'))
    .required()
    .messages({
      'string.pattern.base':
        'New password must start with a capital latter and must be at least 8 characters long.',
      'string.empty': 'New password cannot be empty.',
      'any.required': 'New password must be required.',
    }),
  confirm_password: Joi.string()
    .valid(Joi.ref('new_password'))
    .required()
    .messages({
      'any.only': 'New password and confirm password must be same.',
      'string.empty': 'Confirm password cannot be empty.',
      'any.required': 'Confirm password must be required.',
    }),
});

const forgotPassword = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email cannot be empty.',
    'any.required': 'Email is a required field.',
    'string.email': 'Email must be a valid email address.',
  }),
  new_password: Joi.string()
    .pattern(new RegExp('^[A-Z][a-zA-Z0-9!@#$%&*.]{7,}$'))
    .required()
    .messages({
      'string.pattern.base':
        'New password must start with a capital latter and must be at least 8 characters long.',
      'string.empty': 'New password cannot be empty.',
      'any.required': 'New password must be required.',
    }),
  confirm_password: Joi.string()
    .valid(Joi.ref('new_password'))
    .required()
    .messages({
      'any.only': 'New password and confirm password must be same.',
      'string.empty': 'Confirm password cannot be empty.',
      'any.required': 'Confirm password must be required.',
    }),
  otp: Joi.number().required().messages({
    'number.empty': 'OTP cannot be empty.',
    'number.required': 'OTP is a required field.',
  }),
});

module.exports = {
  adminValidation,
  adminVerification,
  changePassword,
  forgotPassword,
};
