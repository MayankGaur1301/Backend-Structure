// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/index.js";
const PORT = process.env.PORT || 8000;

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    //setting up an event listener for the "error" event, and when an error event occurs, the callback function is executed.
    app.on("error", (error) => {
      console.error("Error: ", error);
      throw error;
    });
    app.listen(PORT, () => {
      console.log(`server is running on port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
  });

/*=========================================================================================================
 1st => aproach is to connect database from index.js file ...but here we polluted the index.js file 
2nd => approach is to create a separate file and write all connection code over there and then import here 
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
