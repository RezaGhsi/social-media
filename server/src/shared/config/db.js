const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

exports.connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error in connectDB ->", error);
    process.exit(1);
  }
};
