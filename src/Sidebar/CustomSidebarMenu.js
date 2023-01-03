// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
const CustomSidebarMenu = (props) => {
  const { user } = useSelector((state) => state.feed);
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("userDetail");
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };
  const handleLogout = async () => {
    await removeValue();
    props.navigation.navigate("LoginScreen");
  };
  const BASE_PATH =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/";
  const proileImage = "react_logo.png";

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
      {/*Top Large Image */}
      <Image
        source={{ uri: "https://pixlr.com/images/index/remove-bg.webp" }}
        style={styles.sideMenuProfileIcon}
      />
      <Text style={{ marginLeft: 10 }}>
        {user["firstName"] ? user["firstName"] : ""}
      </Text>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {/* <DrawerItem
          label="Visit Us"
          onPress={() => Linking.openURL("https://aboutreact.com/")}
        /> */}
        <DrawerItem
          label="Logout"
          onPress={() => {
            handleLogout();
          }}
        />
        {/* <View style={styles.customItem}>
          <Text>Rate Us</Text>
          <Image
            source={{ uri: BASE_PATH + "star_filled.png" }}
            style={styles.iconStyle}
          />
        </View> */}
      </DrawerContentScrollView>
      <Text style={{ fontSize: 16, textAlign: "center", color: "grey" }}>
        www.aboutreact.com
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: "center",
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomSidebarMenu;
