import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
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
    res.status(404).json({ err: error.message });
  }
};
