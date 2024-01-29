import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.models.js";

//update user
export const updateUser = async (req, res, next) => {
  console.log("user from verify in req.....", req.params.id);
  console.log("request body in formdata", req.body);
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "you can only update your own account !"));
  }
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt();
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,

      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
//delete User
export const deleteUser=async(req,res)=>{
  console.log('Delete user called');
  if(req.user.id!=req.params.id){
    return next(errorHandler(401,"you can only delete your accound"))
  }
try {
   await User.findByIdAndDelete(req.params.id);

  // res.status(200).json("user has been deleted").clearCookie('access_token');
  res
    .clearCookie("access_token", { secure: true, sameSite: "None" })
    .status(200)
    .json("user has been deleted");

} catch (error) {
  next(error);
}
}
export const getUserListings=async(req,res,next)=>{
  if(req.user.id==req.params.id){
   try {
     const listings = await Listing.find({ userRef: req.params.id });
    res.status(202).json(listings)
   } catch (error) {
    next(error)
   }
  }else{
 return  next(errorHandler(401,"you can only view your listings"))
  }
}

export const getUser=async(req,res,next)=>{
  try {
    console.log('getUser called');
    const user = await User.findById(req.params.id);
    if(!user) return next(errorHandler(404,'User not found!'));
    const {password:pass,...rest}=user._doc;
    res.status(201).json(rest)
  } catch (error) {
    next(error)
  }
}