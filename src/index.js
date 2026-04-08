import connectDB from "./db/index.js";
import dotenv from "dotenv";
connectDB();

dotenv.config({
  path: "./env",
});

/*
const app = express()(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`app is listening on PORT ${process.env.PORT}`);
    });

  } catch (e) {
    console.log("ERROR", e);
    throw e;
  }
})();
*/
