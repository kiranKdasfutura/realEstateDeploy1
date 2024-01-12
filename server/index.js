import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'


dotenv.config()

const app = express();
//hello
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
