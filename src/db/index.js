import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    // console.log(`instance info !! ${connectionInstance}`);
    console.log(
      `MONGO DB connected !! DB Host ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`MONGO DB CONNECTION FAILED`, error);
    process.exit(1);
  }
}

export default connectDB;
