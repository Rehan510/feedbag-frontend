// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import "react-native-gesture-handler";

import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
// Import Custom Sidebar
import CustomSidebarMenu from "./CustomSidebarMenu";
import { Home, Logout, Orders, Profile } from "../pages";
import Button from "../components/Button";
const Drawer = createDrawerNavigator();

function App() {
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
        <Drawer.Screen
          name="Orders"
          options={{ drawerLabel: "Orders" }}
          component={Orders}
        />
      </Drawer.Navigator>
      <Button mode="contained">Login</Button>
    </>
  );
}

export default App;
