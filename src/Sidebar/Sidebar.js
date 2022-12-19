// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import "react-native-gesture-handler";

import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
// Import Custom Sidebar
import CustomSidebarMenu from "./CustomSidebarMenu";
import { Home, Logout, Orders, Profile } from "../pages";
import Button from "../components/Button";
import { useSelector } from "react-redux";
const Drawer = createDrawerNavigator();

function App(props) {
  const { order } = useSelector((state) => state.feed);
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          activeTintColor: "#e91e63",
          itemStyle: { marginVertical: 5 },
          headerStyle: {
            backgroundColor: "#e91e63", //Set Header color
          },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen
          name="Home"
          options={{ drawerLabel: "Home" }}
          component={Home}
        />
        <Drawer.Screen
          name="Profile"
          options={{ drawerLabel: "Profile" }}
          component={Profile}
        />
      </Drawer.Navigator>
      {order.length > 0 ? (
        <Button
          mode="contained"
          onPress={() => {
            props.navigation.navigate("ViewCart");
          }}
        >
          View your cart
        </Button>
      ) : null}
    </>
  );
}

export default App;
