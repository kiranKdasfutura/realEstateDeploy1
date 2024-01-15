import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
//Routes
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())
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
app.use("/api/user", userRouter);
app.use('/api/auth',authRouter)

//error handle middleware
app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500
  const message=err.message || "Internal Server error"
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message
    
  })
})