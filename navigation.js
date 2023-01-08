// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
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
} from "./src/screens/customer";
import { theme } from "./src/core/theme";
import { Provider } from "react-native-paper";
import PlaceOrder from "./src/screens/customer/PlaceOrder";
import ViewCart from "./src/screens/customer/ViewCart";
import AddItem from "./src/screens/restaurant/AddItem";
import AxiosInterceptor from "./src/utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "./src/reducers/feed";
import { useDispatch } from "react-redux";
const Navigation = (props) => {
  const { test, order, isLogin } = useSelector((state) => state.feed);
  const [login, setIsLogin] = useState(null);
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  const token = useCallback(async () => {
    let jsonValue = await AsyncStorage.getItem("@userDetail");
    const authToken = JSON.parse(jsonValue);

    if (authToken) {
      dispatch(setUser(authToken.user));
      setIsLogin(authToken.token);
    }
    return authToken;
  }, []);
  useEffect(() => {
    token();
    console.log("nws");
  }, [token, isLogin]);
  console.log(login, "login staus", isLogin);

  return (
    <Provider theme={theme}>
      <Stack.Navigator
        initialRouteName={login ? "SiderbarHome" : "StartScreen"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <>
          <Stack.Screen name="SiderbarHome" component={Home} />
          <Stack.Screen name="LoginScreenn" component={LoginScreen} />
          <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
          <Stack.Screen name="AddItem" component={AddItem} />
          <Stack.Screen name="ViewCart" component={ViewCart} />
        </>
        <Stack.Screen name="StartScreen" component={StartScreen} />
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
