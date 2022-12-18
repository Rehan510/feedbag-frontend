import axios from "axios";
import { get } from "lodash";
import config from "../config/config";

export default {
  initalise: () => {
    axios.defaults.baseURL = config.apiUrl;

    // Request Interceptor. All Request pass from here
    axios.interceptors.request.use(
      (axiosConfig) => {
        const authToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MSwiZW1haWwiOiJhYmNkMUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIyLTEyLTE4VDA5OjI3OjMzLjUwNVoifSwiaWF0IjoxNjcxMzU1NjUzfQ.i34xIFAHi0smLPq0YXrHY7vz7LUzJa1Ztuo92UKneLM";
        if (authToken) {
          axiosConfig.headers["x-token"] = authToken;
        }
        axiosConfig.headers["Content-Type"] = "application/json";
        return axiosConfig;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    /*
				Response Interceptor
				Responsibilities:
				1- If api sends new token then change the store auth token with new token
				2- If api sends 401 token then send user to login page
			*/

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      function (error) {
        if (get(error, "response.status", "") === 401) {
          //let res = get(error, 'response.data', '');
          //if (res['invalidToken']) {
          //   localStorage.removeItem("auth_token");
          //   if (window.location.pathname !== "/PagesRegister") {
          //     window.location.href = "/PagesRegister";
          //   }
          // redirect to login page
          //}
          //if (res['TokenExpired']) {
          //refreshToken();
          // refresh user token
          //}
        } else {
          return Promise.reject(error);
        }
      }
    );
  },
};
