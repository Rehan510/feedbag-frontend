// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useEffect } from "react";
import { View, Text } from "react-native";
import ResturantCards from "./ResturantCards";
import { useSelector, useDispatch } from "react-redux";
import { getRestaurants, getRestaurantWithItems } from "./pagesAction";
import {
  setSelectedRestaurant,
  setRestaurantItems,
  setSelectedItem,
  setOrder,
} from "../reducers/feed";
import { get } from "lodash";
const Home = ({ navigation }) => {
  const { restaurants } = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const handleSelectedRestaurant = (selectedRestaurant) => {
    dispatch(setOrder([]));
    dispatch(setSelectedItem(null));
    dispatch(setRestaurantItems([]));
    dispatch(setSelectedRestaurant(selectedRestaurant));
    dispatch(getRestaurantWithItems(get(selectedRestaurant, "id", null)));
    navigation.navigate("Items");
  };
  useEffect(() => {
    dispatch(getRestaurants());
    console.log(restaurants);
  }, []);
  return (
    <>
      <ResturantCards
        data={restaurants}
        handleSelectedRestaurant={handleSelectedRestaurant}
      />
    </>
  );
};

export default Home;
