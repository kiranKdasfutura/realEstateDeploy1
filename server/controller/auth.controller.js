import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};
export const singnIn = async (req, res, next) => {
  console.log(req.body);
  console.log("jwt :", process.env.JWT_SECRET);
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }
    const validPassword = await bcrypt.compare(password, validUser.password);
    console.log("validation in db", validUser, validPassword);
    if (!validPassword) {
      return next(errorHandler(404, "Not a valid password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("token generated after sign in......", token);
    const { password: userPassword, ...rest } = validUser._doc;

    const expirationTime = 60 * 60 * 1000; // 1 hour in milliseconds
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + expirationTime),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error("Error during sign-in:", error);
    next(error);
  }
};

//google oauthentication
export const google = async (req, res, next) => {
  const { email, displayName, photoURL } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      console.log("token generated after google......", token);
      const { password: userPassword, ...rest } = user._doc;
      const expirationTime = 60 * 60 * 1000;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + expirationTime),
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt();
      const hasedPassword = await bcrypt.hash(generatedPassword, salt);
      const newUser = new User({
        username:
          displayName.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: email,
        password: hasedPassword,
        avatar: photoURL,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const { password: userPassword, ...rest } = newUser._doc;
      const expirationTime = 60 * 60 * 1000;

      res.cookie("access_token", token, {httpOnly: true,expires: new Date(Date.now() + expirationTime),})
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
//signout user
export const signOut=async(req,res)=>{
  console.log("signout called");
  try {
    res.clearCookie('access_token');
    res.status(200).json('Signout successfull')
  } catch (error) {
    next(error)
  }
}