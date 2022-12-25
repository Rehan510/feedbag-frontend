// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ResturantCards from "./ResturantCards";
import { useSelector, useDispatch } from "react-redux";
import { getRestaurants, getRestaurantWithItems } from "./pagesAction";
import {
  setSelectedRestaurant,
  setRestaurantItems,
  setSelectedItem,
  setOrder,
} from "../../reducers/feed";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
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
      {restaurants.length > 0 ? (
        <ResturantCards
          data={restaurants}
          handleSelectedRestaurant={handleSelectedRestaurant}
        />
      ) : (
        <View style={styles.middle}>
          <ActivityIndicator
            style={styles.middle}
            animating={true}
            color={"black"}
          />
          <Text style={styles.middle}> Please wait ...</Text>
        </View>
      )}
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  top: {
    flex: 0.3,
    backgroundColor: "grey",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    textAlign: "center",
    // backgroundColor: "beige",
    // borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: "pink",
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
