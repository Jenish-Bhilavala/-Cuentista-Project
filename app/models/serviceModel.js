const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    service_name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    service_description: {
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
    sub_service: [
      {
        sub_service_title: {
          type: String,
          maxLength: 50,
          default: null,
        },
        sub_service_description: {
          type: String,
          maxLength: 255,
          default: null,
        },
      },
    ],
    service_approach: [
      {
        approach: {
          type: String,
          maxLength: 255,
          default: null,
        },
      },
    ],
    service_atc: [
      {
        atc: {
          type: String,
          maxLength: 50,
          default: null,
        },
      },
    ],
    service_benefit: [
      {
        benefit: {
          type: String,
          maxLength: 255,
          default: null,
        },
      },
    ],
    service_consulting: [
      {
        details_title: {
          type: String,
          maxLength: 50,
          default: null,
        },
        details_description: {
          type: String,
          maxLength: 255,
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'service',
  }
);

const serviceModel = mongoose.model('service', serviceSchema);
module.exports = serviceModel;
