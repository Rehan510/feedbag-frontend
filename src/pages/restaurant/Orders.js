// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useCallback, useEffect, useState } from "react";
import { Button, View, Text, SafeAreaView } from "react-native";
import UserOrders from "./RestaurantOrders";
import axios from "axios";
import config from "../../config/config";
import { useSelector } from "react-redux";
const Orders = ({ navigation }) => {
  const { userRestaurant } = useSelector((state) => state.restaurant);
  const [preOrders, setPreOrders] = useState([]);
  const getOrderHistory = useCallback(async () => {
    try {
      const resp = await axios.get(
        `${config.apiUrl}/order/get/byRestaurant?restaurantId=${userRestaurant.id}`
      );
      console.log(resp.data);
      if (!resp.data.error) {
        setPreOrders(resp.data.data);
      }
    } catch (error) {
      setPreOrders([]);
    }
  }, []);

  useEffect(() => {
    getOrderHistory();
  }, [getOrderHistory]);
  const handleStatus = async (orderId, currentStatus) => {
    try {
      const payload = {
        restaurantId: userRestaurant.id,
        orderId: orderId,
        status: currentStatus === "pending" ? "complete" : "pending",
      };
      console.log(payload, "pal");
      const resp = await axios.put(`${config.apiUrl}/order/update/`, payload);
      if (!resp.data.error) {
        getOrderHistory();
      }
    } catch (error) {
      getOrderHistory();
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Text>Rehan orders</Text> */}
      <View style={{ flex: 1, padding: 16 }}>
        <UserOrders preOrders={preOrders} handleStatus={handleStatus} />
      </View>
    </SafeAreaView>
  );
};

export default Orders;
