const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      maxLength: 255,
    },
  },
  {
    timestamps: true,
    collection: 'admin',
  }
);

const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel;
