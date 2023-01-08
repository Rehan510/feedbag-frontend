import { useDispatch, useSelector } from "react-redux";
import { setRestaurants, setRestaurantItems } from "../../reducers/feed";
import config from "../../config/config";
import axios from "axios";
import { get } from "lodash";

export const getRestaurants = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${config.apiUrl}/restaurant/getAll`);
      let restaurantsData = get(response, "data.data", []);
      if (restaurantsData) {
        dispatch(setRestaurants(restaurantsData));
      }
    } catch (error) {
      dispatch(setRestaurants([]));

      console.log(error);
    }
  };
};

export const getRestaurantWithItems = (restaurantId) => {
  return async (dispatch, getState) => {
    if (!restaurantId) {
      return;
    }
    try {
      const response = await axios.get(
        `${config.apiUrl}/restaurant/get?restaurantId=${restaurantId}`
      );

      let restaurantsItemsData = get(response, "data.data", []);

      const restaurantItems = get(restaurantsItemsData, "Items", []);
      dispatch(setRestaurantItems(restaurantItems));
    } catch (error) {
      dispatch(setRestaurantItems([]));

      console.log(error);
    }
  };
};
