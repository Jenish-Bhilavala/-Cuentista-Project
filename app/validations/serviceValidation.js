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
  images: Joi.object({
    overview_image: Joi.string().required().messages({
      'string.base': 'Overview image must be a string.',
      'string.empty': 'Overview image cannot be empty.',
      'any.required': 'Overview image is required.',
    }),
    service_image: Joi.string().required().messages({
      'string.base': 'Service image must be a string.',
      'string.empty': 'Service image cannot be empty.',
      'any.required': 'Service image is required.',
    }),
    right_side_image1: Joi.string().required().messages({
      'string.base': 'Right side image 1 must be a string.',
      'string.empty': 'Right side image 1 cannot be empty.',
      'any.required': 'Right side image 1 is required.',
    }),
    right_side_image2: Joi.string().required().messages({
      'string.base': 'Right side image 2 must be a string.',
      'string.empty': 'Right side image 2 cannot be empty.',
      'any.required': 'Right side image 2 is required.',
    }),
  })
    .required()
    .messages({
      'object.base': 'Images must be an object.',
      'object.empty': 'Images cannot be empty.',
      'object.required': 'Images are required.',
    }),
  sub_service: Joi.array()
    .items(
      Joi.object({
        sub_service_title: Joi.string().optional().messages({
          'string.base': 'Sub-service title must be a string.',
        }),
        sub_service_description: Joi.string().optional().messages({
          'string.base': 'Sub-service description must be a string.',
        }),
      })
    )
    .optional()
    .messages({
      'array.base': 'Sub-services must be an array.',
    }),
  service_approach: Joi.array()
    .items(
      Joi.object({
        approach: Joi.string().optional().messages({
          'string.base': 'Approach must be a string.',
        }),
      })
    )
    .optional()
    .messages({
      'array.base': 'Service approach must be an array.',
    }),
  service_atc: Joi.array()
    .items(
      Joi.object({
        atc: Joi.string().optional().messages({
          'string.base': 'ATC must be a string.',
        }),
      })
    )
    .optional()
    .messages({
      'array.base': 'Service ATC must be an array.',
    }),
  service_benefit: Joi.array()
    .items(
      Joi.object({
        benefit: Joi.string().optional().messages({
          'string.base': 'Benefit must be a string.',
        }),
      })
    )
    .optional()
    .messages({
      'array.base': 'Service benefits must be an array.',
    }),
  service_consulting: Joi.array()
    .items(
      Joi.object({
        details_title: Joi.string().optional().messages({
          'string.base': 'Consulting title must be a string.',
        }),
        details_description: Joi.string().optional().messages({
          'string.base': 'Consulting description must be a string.',
        }),
      })
    )
    .optional()
    .messages({
      'array.base': 'Service consulting must be an array.',
    }),
});

const updateService = Joi.object({
  service_name: Joi.string().optional().messages({
    'string.base': 'Service name must be a string.',
  }),

  service_description: Joi.string().optional().messages({
    'string.base': 'Service description must be a string.',
  }),

  images: Joi.object().optional().messages({
    'object.base': 'Images must be an object.',
  }),

  sub_service: Joi.array()
    .optional()
    .items(
      Joi.object({
        sub_service_title: Joi.string().optional().messages({
          'string.base': 'Sub-service title must be a string.',
        }),
        sub_service_description: Joi.string().optional().messages({
          'string.base': 'Sub-service description must be a string.',
        }),
      })
    )
    .messages({
      'array.base': 'Sub-services must be an array.',
    }),

  service_approach: Joi.array()
    .optional()
    .items(
      Joi.object({
        approach: Joi.string().optional().messages({
          'string.base': 'Service approach must be a string.',
        }),
      })
    )
    .messages({
      'array.base': 'Service approach must be an array.',
    }),

  service_atc: Joi.array()
    .optional()
    .items(
      Joi.object({
        atc: Joi.string().optional().messages({
          'string.base': 'Service ATC must be a string.',
        }),
      })
    )
    .messages({
      'array.base': 'Service ATC must be an array.',
    }),

  service_benefit: Joi.array()
    .optional()
    .items(
      Joi.object({
        benefit: Joi.string().optional().messages({
          'string.base': 'Service benefit must be a string.',
        }),
      })
    )
    .messages({
      'array.base': 'Service benefit must be an array.',
    }),

  service_consulting: Joi.array()
    .optional()
    .items(
      Joi.object({
        details_title: Joi.string().optional().messages({
          'string.base': 'Consulting title must be a string.',
        }),
        details_description: Joi.string().optional().messages({
          'string.base': 'Consulting description must be a string.',
        }),
      })
    )
    .messages({
      'array.base': 'Service consulting must be an array.',
    }),
});

module.exports = { serviceValidation, updateService };
