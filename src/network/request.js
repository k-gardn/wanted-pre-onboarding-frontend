import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("access_token");
    console.log(accessToken);
    if (accessToken !== null) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      config.headers["Authorization"] = "";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// if (!accessToken || !refreshToken) {
//   config.headers["authorization"] = null;
//   config.headers["refresh-token"] = null;
// } else {
//   config.headers["authorization"] = accessToken;
//   config.headers["refresh-token"] = refreshToken;
// }
