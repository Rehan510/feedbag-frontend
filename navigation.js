// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import Home from "./src/Sidebar/Sidebar";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Button from "./src/components/Button";
import axios from "axios";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  Items,
} from "./src/screens";
import { theme } from "./src/core/theme";
import { Provider } from "react-native-paper";
import PlaceOrder from "./src/screens/PlaceOrder";
import ViewCart from "./src/screens/ViewCart";
const Navigation = (props) => {
  const { test, isLogin, order } = useSelector((state) => state.feed);

  const Stack = createStackNavigator();
  useEffect(() => {
    console.log("i am navigations");
  }, []);
  console.log("login staus", isLogin);
  return (
    <Provider theme={theme}>
      <Stack.Navigator
        initialRouteName="StartScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLogin ? (
          <>
            <Stack.Screen name="SiderbarHome" component={Home} />
            <Stack.Screen name="LoginScreenn" component={LoginScreen} />
            <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
            <Stack.Screen name="ViewCart" component={ViewCart} />
          </>
        ) : (
          <Stack.Screen name="StartScreen" component={StartScreen} />
        )}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
        <Stack.Screen name="Items" component={Items} />
      </Stack.Navigator>
    </Provider>
  );
};
export default Navigation;
