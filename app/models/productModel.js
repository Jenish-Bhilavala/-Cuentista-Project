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
    productBenefit: [
      {
        benefit_description: {
          type: String,
          required: true,
        },
      },
    ],
    product_service: [
      {
        service_type: {
          type: String,
          required: true,
        },
        service_details: {
          type: String,
          required: true,
        },
      },
    ],
    methodology: [
      {
        steps: {
          type: String,
          required: true,
        },
      },
    ],
    expertise: [
      {
        area: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
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
