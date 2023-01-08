import axios from "axios";
import { get } from "lodash";
import config from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default {
  initalise: () => {
    axios.defaults.baseURL = config.apiUrl;
    // Request Interceptor. All Request pass from here
    console.log("some one hit");
    const token = async () => {
      console.log("some one call token")
      let data = null;
      try {
        let jsonValue = await AsyncStorage.getItem("@userDetail");
        // console.log(`*****************************************************
        //              *
        //              *
        //              *
        //              *           token detail
        //              *            ${jsonValue}
        //              *
        //              *
        //              *
        //              *
        //              * *****************************************************
        // `);

        if (jsonValue) {
          data = JSON.parse(jsonValue).token;
        }
      } catch (e) {
        console.log(e);
        // error reading value
      }
console.log(" ia m returning data")
      console.log(data);
      return data;
    };

    axios.interceptors.request.use(
      async (axiosConfig) => {
        const authToken = await token();
        console.log("inter set");
        console.log(authToken);
        if (authToken) {
          axiosConfig.headers["x-token"] = await authToken;
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
