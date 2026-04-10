import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`server is running on port :  ${PORT}`);
    });
    server.on("error", (error) => {
      console.log("SERVER ERROR", error);
      process.exit(1);
    });
  })
  .catch((error) => {
    console.log("MONGO DB CONNECTION FAILED :", error);
  });
