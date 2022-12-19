import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text, RadioButton } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import config from "../config/config";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { get } from "lodash";
import {
  setSelectedItem,
  setSelectedRestaurant,
  setOrder,
} from "../reducers/feed";
export default function PlaceOrder({ navigation }) {
  const [phoneNo, setPhoneNo] = useState({ value: "", error: "" });
  const [address, setAddress] = useState({ value: "", error: "" });
  const [note, setNote] = useState({ value: "", error: "" });
  const { order, selectedRestaurant } = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  console.log("ress");
  console.log(selectedRestaurant);
  const placeOrder = async () => {
    try {
      if (!selectedRestaurant.id) {
        return;
      }
      const data = {
        contactNo: phoneNo.value,
        deliveryAddress: address.value,
        specialNote: note.value,
        quantity: "new",
        orderFrom: get(selectedRestaurant, "name", null),
        restaurantId: get(selectedRestaurant, "id", null),
        orderedItems: order,
      };
      console.log(data);
      // return;
      console.log(config.apiUrl);
      const response = await axios.post(`${config.apiUrl}/order/add`, data);
      if (!response.data.error) {
        // console.log(response.data);
        // dispatch(setSelectedItem(null));
        // dispatch(setSelectedRestaurant(null));
        dispatch(setOrder([]));
        dispatch;
        Alert.alert("your order is placed");
        navigation.navigate("SiderbarHome");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOrder = () => {
    placeOrder();
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "Dashboard" }],
    // });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Place your order</Header>
      <TextInput
        label="Contact No"
        returnKeyType="next"
        value={phoneNo.value}
        onChangeText={(text) => setPhoneNo({ value: text, error: "" })}
        error={!!phoneNo.error}
        errorText={phoneNo.error}
      />

      <TextInput
        label="Delivery Address"
        returnKeyType="next"
        value={address.value}
        onChangeText={(text) => setAddress({ value: text, error: "" })}
        error={!!address.error}
        errorText={address.error}
        autoCapitalize="none"
        autoCompleteType="address"
      />
      <TextInput
        label="Special Note"
        returnKeyType="done"
        value={note.value}
        onChangeText={(text) => setNote({ value: text, error: "" })}
        error={!!note.error}
        errorText={note.error}
      />

      <Button mode="contained" onPress={handleOrder} style={{ marginTop: 24 }}>
        Confirm your Order
      </Button>
      {/* <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View> */}
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
