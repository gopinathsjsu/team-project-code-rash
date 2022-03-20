import mongoose from "mongoose";
import config  from "./config.js";
const { mongoDB } = config;

// MongoDB Connection
const connectMongoDB = async () => {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    try {
      await mongoose.connect(mongoDB, options);
      console.log("Connected to MongoDB!");
    } catch (err) {
      console.log("Can't connect to MongoDB", err);
    }
  };
  
export default connectMongoDB;