import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../axios/requestMethods";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import {
  signInFailure,
  signInStart,
  signinSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
// axios.defaults.withCredentials = true;

const SignIn = () => {
  useEffect(() => {
    dispatch(signInFailure(null));
  }, []);

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  //handling changes of input field by a common handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  //submiting form data to backend
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await axiosInstance.post("/auth/signin", formData, {
        withCredentials: true,
      });
      console.log("full response from signin:", res);
      dispatch(signinSuccess(res.data));
      navigate("/");
    } catch (error) {
      console.log("full error ", error);
      console.log("unique schema manual error  ", error.response.data);
      if (error.response.data.success === false) {
        dispatch(signInFailure(error.response.data.message));
        return;
      }
      dispatch(signInFailure(error.message));
      console.log(error);
    }
  };
  //return
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg "
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg "
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 text-white rounded-lg hover:opacity-95 disabled:opacity-80 uppercase"
        >
          {loading ? "Loading..." : " sign in"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        {" "}
        doesnt
        <p>Dont have a account ?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-600">{error} </p>}
    </div>
  );
};

export default SignIn;
