import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { Text, RadioButton, TextInputMask } from "react-native-paper";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import BackButton from "../../components/BackButton";
import { theme } from "../../core/theme";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { nameValidator } from "../../helpers/nameValidator";
import config from "../../config/config";
import axios from "axios";
import File from "../../screens/restaurant/FileUpload";
import * as ImagePicker from "expo-image-picker";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getUserRestaurantWithItems } from "./restaurantAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [description, setDescription] = useState({ value: "", error: "" });
  const [address, setAddress] = useState({
    value: "",
    error: "",
  });
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const { userRestaurant } = useSelector((state) => state.restaurant);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      noData: true,
    });

    // if (!result.canceled) {
    setImage(result.assets[0]);

    console.log(result.assets);
    // setImage(result);
    // }
  };

  const add = async () => {
    if (!image) {
      Alert.alert("Please upload item picture");
      return;
    }

    try {
      let formData = new FormData();
      console.log("photo \n");
      console.log(image);
      console.log(Platform.OS);
      formData.append("picture", {
        name: "itemms",
        type: "image/jpeg",
        uri:
          Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
      });
      formData.append("name", name.value);
      formData.append("address", address.value);
      formData.append("phoneNo", phone.value);
      formData.append("description", description.value);

      let jsonValue = await AsyncStorage.getItem("@userDetail");
      const token = JSON.parse(jsonValue).token;
      let resp = await fetch(`${config.apiUrl}/restaurant/register`, {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
          "x-token": token,
        },
        body: formData,
      });

      //   debugger;
      //   const resp = await axios.post(`${config.apiUrl}/item/add`, formData, {
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "image/jpeg",
      //     },
      //     transformRequest: (d) => formData,
      //   });

      if (resp) {
        Alert.alert("Your item restaurant created");

        dispatch(getUserRestaurantWithItems());
      }

      setName({ value: "", error: "" });
      setDescription({ value: "", error: "" });
      setImage(null);
      setPhone({ value: "", error: "" });
    } catch (error) {
      Alert.alert("SomeThing went wrong");
      console.log(error);
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header> Your Restaurant</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Address"
        returnKeyType="next"
        value={address.value}
        onChangeText={(text) => setAddress({ value: text, error: "" })}
        error={!!address.error}
        errorText={address.error}
      />
      <TextInput
        label="PhoneNo"
        returnKeyType="next"
        value={phone.value}
        onChangeText={(text) => setPhone({ value: text, error: "" })}
        error={!!phone.error}
        errorText={phone.error}
        autoCapitalize="none"
        textContentType="Price"
        keyboardType="numeric"
      />
      <TextInput
        label="Description"
        returnKeyType="done"
        value={description.value}
        onChangeText={(text) => setDescription({ value: text, error: "" })}
        error={!!description.error}
        errorText={description.error}
      />
      <File image={get(image, "uri", "")} pickImage={pickImage} />
      <Button
        mode="contained"
        onPress={() => {
          add();
        }}
        style={{ marginTop: 24 }}
      >
        Add
      </Button>
      <View style={styles.row}></View>
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
