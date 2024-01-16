import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../server/axios/requestMethods";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/signin", formData);
      console.log("full response:", res);
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      console.log("full error ", error);
      console.log("unique schema manual error  ", error.response.data);
      if (error.response.data.success === false) {
        setLoading(false);
        setError(error.response.data.message);
        return;
      }
      setError(error.message);
      setLoading(false);
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
      </form>
      <div className="flex gap-2 mt-5"> doesnt
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
