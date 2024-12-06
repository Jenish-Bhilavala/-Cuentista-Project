const moment = require('moment');
const mongoose = require('mongoose');

const optSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
      default: () => moment().format(),
    },
    expire_at: {
      type: Date,
      required: true,
      default: moment().add(5, 'minutes').format(),
    },
  },
  {
    collection: 'otp',
  }
);

optSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const otpModel = mongoose.model('otp', optSchema);
module.exports = otpModel;
