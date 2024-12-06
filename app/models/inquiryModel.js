const mongoose = require('mongoose');
const { status } = require('../utils/enum');
const { required } = require('joi');

const inquirySchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    last_name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      maxLength: 10,
      minLength: 10,
    },
    message: {
      type: String,
      required: true,
      maxLength: 255,
    },
    status: {
      type: String,
      enum: status,
      default: status.PENDING,
    },
  },
  {
    timestamps: true,
    collection: 'inquiry',
  }
);

const inquiryModel = mongoose.model('inquiry', inquirySchema);
module.exports = inquiryModel;
