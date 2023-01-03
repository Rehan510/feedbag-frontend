// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import "react-native-gesture-handler";

import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
// Import Custom Sidebar
import CustomSidebarMenu from "./CustomSidebarMenu";
import { Home, Orders, Profile } from "../pages/customer";
import { RestaurantHomePage } from "../pages/restaurant";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { Restaurant } from "../pages/restaurant";
const Drawer = createDrawerNavigator();

function App(props) {
  const restaurant = [
    {
      name: "Home",
      label: "Home",
      comment: RestaurantHomePage,
    },
    {
      name: "Profile",
      label: "Profile",
      comment: Profile,
    },
    {
      name: "Restaurant",
      label: "Restaurant",
      comment: Restaurant,
    },
  ];
  const customer = [
    {
      name: "Home",
      label: "Home",
      comment: Home,
    },
    {
      name: "Profile",
      label: "Profile",
      comment: Profile,
    },
    {
      name: "Orders",
      label: "Orders & History",
      comment: Orders,
    },
  ];

  const { order, user } = useSelector((state) => state.feed);
  console.log("i am user");
  console.log(user);
  const data = user.accountType === "restaurant" ? restaurant : customer;
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
        {data.map((d, index) => {
          return (
            <Drawer.Screen
              key={`scr${index}`}
              name={d.name}
              options={{ drawerLabel: d.label }}
              component={d.comment}
            />
          );
        })}
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
