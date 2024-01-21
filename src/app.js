import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Parse incoming JSON requests with a maximum payload size of 16kb
app.use(express.json({ limit: "16kb" }));

// Parse incoming URL-encoded data with extended options and a maximum payload size of 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse cookies in incoming requests
app.use(cookieParser());
 


export { app };
