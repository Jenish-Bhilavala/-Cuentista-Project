const Joi = require('joi');

const productValidation = Joi.object({
  product_name: Joi.string().required().messages({
    'string.base': 'Product name must be a string.',
    'string.empty': 'Product name cannot be empty.',
    'any.required': 'Product name is required.',
  }),

  product_description: Joi.string().required().messages({
    'string.base': 'Product description must be a string.',
    'string.empty': 'Product description cannot be empty.',
    'any.required': 'Product description is required.',
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
      'string.empty': 'Right side image 1 image cannot be empty.',
      'any.required': 'Right side image 1 is required.',
    }),

    right_side_image2: Joi.string().required().messages({
      'string.base': 'Right side image 2 must be a string.',
      'string.empty': 'Right side image 2 image cannot be empty.',
      'any.required': 'Right side image 2 is required.',
    }),
  })
    .required()
    .messages({
      'object.base': 'Images must be an object.',
      'object.empty': 'images cannot be empty.',
      'object.required': 'Images are required.',
    }),

  contact: Joi.string().required().messages({
    'string.base': 'Contact must be a string.',
    'string.empty': 'Contact cannot be empty.',
    'any.required': 'Contact is required.',
  }),

  product_benefit: Joi.array()
    .items(
      Joi.object({
        benefit_description: Joi.string().optional().messages({
          'string.base': 'Benefit description must be a string.',
        }),
      })
    )
    .optional()
    .messages({
      'array.base': 'Product benefits must be an array.',
    }),

  product_service: Joi.array()
    .items(
      Joi.object({
        service_type: Joi.string().optional().messages({
          'string.base': 'Service type must be a string.',
        }),

        service_details: Joi.array()
          .items(
            Joi.object({
              service_detail: Joi.string().optional().messages({
                'string.base': 'Service detail must be a string.',
              }),
            })
          )
          .optional()
          .messages({
            'array.base': 'Service details must be an array.',
          }),
      })
    )
    .optional()
    .messages({
      'array.base': 'Product services must be an array.',
    }),

  methodology: Joi.array()
    .items(
      Joi.object({
        methodology_steps: Joi.string().optional().messages({
          'string.base': 'Methodology step must be a string.',
        }),
      })
    )
    .optional()
    .messages({
      'array.base': 'Methodology steps must be an array.',
    }),

  expertise: Joi.array()
    .items(
      Joi.object({
        area: Joi.string().optional().messages({
          'string.base': 'Expertise area must be a string.',
        }),

        description: Joi.string().optional().messages({
          'string.base': 'Expertise description must be a string.',
        }),
      })
    )
    .optional()
    .messages({
      'array.base': 'Expertise must be an array.',
    }),
});

const updateProduct = Joi.object({
  product_name: Joi.string().optional().messages({
    'string.base': 'Product name must be a string.',
  }),
  product_description: Joi.string().optional().messages({
    'string.base': 'Product description must be a string.',
  }),
  images: Joi.object().optional().messages({
    'object.base': 'Image must be a string.',
  }),
  contact: Joi.string().optional().messages({
    'string.base': 'Contact must be a string.',
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
