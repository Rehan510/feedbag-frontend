// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useCallback, useEffect, useState } from "react";
import { Button, View, Text, SafeAreaView } from "react-native";
import UserOrders from "./UserOrders";
import axios from "axios";
import config from "../../config/config";
const Orders = ({ navigation }) => {
  const [preOrders, setPreOrders] = useState([]);
  const getOrderHistory = useCallback(async () => {
    try {
      const resp = await axios.get(`${config.apiUrl}/order/get`);
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
 
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <UserOrders preOrders={preOrders} />
      </View>
    </SafeAreaView>
  );
};

export default Orders;
