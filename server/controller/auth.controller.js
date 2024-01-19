import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hasedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hasedPassword,
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
    const validPassword = bcrypt.compareSync(password, validUser.password);
    console.log("validation in db", validUser, validPassword);
    if (!validPassword) {
      return next(errorHandler(404, "Not valid password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: userPassword, ...rest } = validUser._doc;
    //expires in
    // Set the cookie expiration time to 1 hour (60 minutes)
    // const expirationTime = 60 * 60 * 1000; // 1 hour in milliseconds
    //  .cookie("access_token", token, {
    //     httpOnly: true,
    //     expires: new Date(Date.now() + expirationTime),
    //   })
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
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
      const { password: userPassword, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
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
          Math.random().toString(36).split(-4),
        email: email,
        password: hasedPassword,
        avatar: photoURL,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: userPassword, ...rest } = newUser._doc;
      res.cookie("access_token",token, { httpOnly: true }).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};
