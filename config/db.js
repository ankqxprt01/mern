const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`MongoDB Connected`);

  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // exit process with failure
  }
};

module.exports= connectDB;
