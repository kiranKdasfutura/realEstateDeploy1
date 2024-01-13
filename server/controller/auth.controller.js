import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";


export const signup = async (req, res,next) => {
 const {username,email,password}=req.body
  try {
    const salt = await bcrypt.genSalt();
    const hasedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password:hasedPassword,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
   next(error)
  }
};
