import axios from "axios";

// const BASE_URL = "http://localhost:3000/api/";
const BASE_URL = "https://mern-estate5.onrender.com/api/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include cookies in the requests
});
// http://localhost:3000/api/user/delete/65b0aef08058ab2a128354c6
// http://localhost:3000/api/user/update/65b0aef08058ab2a128354c6