import { useDispatch, useSelector } from "react-redux";
import { setUserRestaurant } from "../../reducers/restaurant";
import config from "../../config/config";
import axios from "axios";
import { get } from "lodash";

export const getUserRestaurantWithItems = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${config.apiUrl}/restaurant/get/owner`);
      let restaurantsData = get(response, "data.data", []);
      console.log("meeeee",restaurantsData)
      if (restaurantsData) {
        dispatch(setUserRestaurant(restaurantsData));
      } else {
        dispatch(setUserRestaurant(null));
      }

      // console.log(response.data);
    } catch (error) {
      dispatch(setUserRestaurant(null));

      console.log(error);
    }
  };
};
