import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { axiosInstance } from "../../../server/axios/requestMethods";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice";
import {useNavigate} from 'react-router-dom'
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      console.log(
        result.user.email,
        result.user.displayName,
        result.user.photoURL
      );

      const res = await axiosInstance.post("/auth/google", {
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      });
      console.log("response google full",res);
      console.log("data",res.data);

      dispatch(signinSuccess(res.data));
      navigate('/')
    } catch (error) {
      console.log("error in Google authentication", error);
    }
  };

  return (
    <button
      className="text-white bg-red-600 rounded-lg uppercase p-3 flex justify-center items-center gap-3 hover:opacity-90"
      type="button"
      onClick={handleGoogleClick}
    >
      <img
        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
        alt=""
        className="w-6 h-auto"
      />
      Continue with Google
    </button>
  );
};

export default OAuth;
