import { useDispatch, useSelector } from "react-redux";
import { setUserRestaurant } from "../../reducers/restaurant";
import config from "../../config/config";
import axios from "axios";
import { get } from "lodash";

export const getUserRestaurantWithItems = (restaurantId) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${config.apiUrl}/restaurant/get/owner`);
      let restaurantsData = get(response, "data.data", []);
      dispatch(setUserRestaurant(restaurantsData));
    
    } catch (error) {
      dispatch(setUserRestaurant(null));

      console.log(error);
    }
  };
};
