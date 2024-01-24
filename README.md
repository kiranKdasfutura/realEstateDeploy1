//README.md

# When using cookies with Axios, it is mandatory to set `withCredentials: true`.

<!--
// import axios from "axios";
// const BASE_URL = "http://localhost:3000/api/";

// export const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, // Include cookies in the requests
// });
-->

# When updating something, it is a best practice to avoid using [...req.body].

 <!-- Because manually, the user can set 'admin' to true. -->

# [badpractice]

{
req.body
}

# [goodpractice]

        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },

      { new: true }

