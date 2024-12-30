const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const db =
      process.env.NODE_ENV === 'test'
        ? process.env.DB_TEST_CONNECTION
        : process.env.DB_CONNECTION;

    await mongoose.connect(db);
    console.log(`Database connected successfully to ${db}.`);
  } catch (error) {
    console.log('Database error :', error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

module.exports = { connectDB, disconnectDB };
