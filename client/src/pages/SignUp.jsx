import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { axiosInstance } from "../axios/requestMethods";


const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  //rudux methods
  // const dispatch = useDispatch();
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
    setLoading(true)
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      console.log("full response:", res);
      setLoading(false)
      setError(null)
      navigate("/sign-in");
    } catch (error) {
      console.log("full error ", error);
      console.log("unique schema manual error  ", error.response.data);
      if (error.response.data.success === false) {
         setLoading(false);
         setError(error.response.data.message);
        return;
      }
      setError(error.message)
      setLoading(false)
      console.log(error);
    }
  };
  //return
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignUP</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg "
          onChange={handleChange}
          required
        />
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
          {loading ? "Loading..." : " sign up"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-600">{error} </p>}
    </div>
  );
};

export default SignUp;
