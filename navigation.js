// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import Home from "./src/Sidebar/Sidebar";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
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
import config from "./src/config/config";
// import SyncStorage from "sync-storage";
const Navigation = () => {
  // const [isLogin, setIsLogin] = useState(false);
  const { test, isLogin } = useSelector((state) => state.feed);
  console.log(test, "sdfsfsdfsfdz");
  const Stack = createStackNavigator();
  const abc = async () => {
    const data = await axios.post(config.apiUrl + "/api/user/test_url");
    // console.log(data);
  };
  // const userData = async () => {
  //   try {
  //     const value = await SyncStorage.get("user");
  //     if (value !== null) {
  //       // We have data!!
  //       setIsLogin(true);
  //       console.log("login user");
  //       console.log(value);
  //     } else {
  //       setIsLogin(false);
  //       console.log("nnn");
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };
  useEffect(() => {
    console.log("login test");
    // userData();
    // abc();
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
