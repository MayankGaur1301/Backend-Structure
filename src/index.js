// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

const app = express();
connectDB();

/* one aproach is to connect database from index.js file ...but here we polluted the index.js file 
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("Error :", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`server is listening on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
})();
*/
