import { useDispatch, useSelector } from "react-redux";
import { setRestaurants } from "../../reducers/feed";
import config from "../../config/config";
import axios from "axios";
import { get } from "lodash";

export const getRestaurantWithItems = (restaurantId) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/restaurant/get?restaurantId=${restaurantId}`
      );
      let restaurantsData = get(response, "data.data", []);
      dispatch(setRestaurants(restaurantsData));
      console.log(response.data);
    } catch (error) {
      dispatch(setRestaurants([]));

      console.log(error);
    }
  };
};
