// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import * as React from "react";
import { View, Text } from "react-native";
import ResturantCards from "../components/ResturantCards";

const Home = ({ navigation }) => {
  return (
    <>
      <ResturantCards navigation={navigation} />
    </>
  );
};

export default Home;
