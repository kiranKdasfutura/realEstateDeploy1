import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path'
//Routes
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js"
dotenv.config();

const app = express();
// Specify the allowed origin
// Specify the allowed HTTP methods
// Allow cookies and HTTP authentication to be sent
app.use(
  cors({
    origin: ["http://localhost:5173", "https://mern-estate5.onrender.com"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
//MONGO_URL=mongodb+srv://kirankdas:kirankdas@mern-estate.gjmavtq.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log("server running on port 3000");
});

const __dirname=path.resolve()

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing",listingRouter)

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//error handle middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error(err.stack); // Log the error stack for debugging purposes
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
