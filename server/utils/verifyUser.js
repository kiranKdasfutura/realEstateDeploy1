import { errorHandler } from "./error.js";
import Jwt from "jsonwebtoken";
// import  express  from "express";
// const app=express()
// import cookieParser from "cookie-parser";
// app.use(cookieParser());
export const verifyToken = (req, res, next) => {
  console.log("All Cookies:", req.cookies);
  const token = req.cookies.access_token;
  console.log("token***********************", token);
  if (!token) {
    return next(errorHandler(401, "Unauthorized")); // Updated status code to 401 for unauthorized
  }
  Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {

      console.error("JWT Verification Error:", err); // Log the error for debugging
      return next(errorHandler(403, "Forbidden"));
    }
    console.log("JWT User:", user);
    req.user = user;
    next();
  });
};
