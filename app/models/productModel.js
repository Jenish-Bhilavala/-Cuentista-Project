const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    product_description: {
      type: String,
      required: true,
      maxLength: 255,
    },
    images: {
      overview_image: {
        type: String,
        required: true,
      },
      service_image: {
        type: String,
        required: true,
      },
      right_side_image1: {
        type: String,
        required: true,
      },
      right_side_image2: {
        type: String,
        required: true,
      },
    },
    contact: {
      type: String,
      required: true,
      maxLength: 255,
    },
    product_benefit: [
      {
        benefit_description: {
          type: String,
          default: null,
          maxLength: 255,
        },
      },
    ],
    product_service: [
      {
        service_type: {
          type: String,
          default: null,
          maxLength: 50,
        },
        service_details: [
          {
            service_detail: {
              type: String,
              default: null,
              maxLength: 255,
            },
          },
        ],
      },
    ],
    methodology: [
      {
        methodology_steps: {
          type: String,
          default: null,
          maxLength: 50,
        },
      },
    ],
    expertise: [
      {
        area: {
          type: String,
          default: null,
          maxLength: 50,
        },
        description: {
          type: String,
          default: null,
          maxLength: 255,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'product',
  }
);

const productModel = mongoose.model('product', productSchema);
module.exports = productModel;
