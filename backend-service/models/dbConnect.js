// ./models/dbConnect.js

const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect(process.env.db_connect);
    console.log('MongoDB connected!');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connection; // <-- Make sure you export the
