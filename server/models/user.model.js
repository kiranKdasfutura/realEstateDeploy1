import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
 export default User;
