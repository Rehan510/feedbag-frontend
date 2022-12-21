// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Button, Paragraph, Card, Chip, Title } from "react-native-paper";
import Header from "../components/Header";
import ProfileEditDialog from "./ProfileEditDialog";
import config from "../config/config";
import axios from "axios";
import { useSelector } from "react-redux";
import { get } from "lodash";
const Profile = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ textField: "", value: "", label: "" });
  const { user } = useSelector((state) => state.feed);
  console.log("user", user);
  const style = { marginTop: 20 };
  const updateProfile = async (userData) => {
    console.log(userData);
    let payload = {};
    if (userData["textField"] === "name") {
      payload = { firstName: userData["value"] };
    }
    if (userData["textField"] === "email") {
      payload = { email: userData["value"] };
    }
    if (userData["textField"] === "contactNo") {
      payload = { contactNo: userData["value"] };
    }
    if (userData["textField"] === "address") {
      payload = { address: userData["value"] };
    }
    console.log("oaayayay");
    console.log(payload);
    try {
      const response = await axios.put(
        `${config.apiUrl}/users/updateProfile`,
        payload
      );
      setData({ textFied: "", value: "", label: "" });
      setShow(false);
      console.log("res", response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (data) => {
    setData(data);
    setShow(true);
  };
  const hideDialog = () => {
    setShow(false);
  };

  const handleInput = (text) => {
    console.log(text);
    setData({ ...data, value: text });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <ProfileEditDialog
          show={show}
          data={data}
          handleInput={handleInput}
          hideDialog={hideDialog}
          updateProfile={updateProfile}
        />
        <View
          style={{
            flex: 1,
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <Card style={style}>
            <Card.Content>
              <Paragraph>Name</Paragraph>
              <Chip icon="human" mode="outlined">
                {get(user, "firstName", "")}
              </Chip>
            </Card.Content>
            <Card.Actions>
              <Chip
                mode="outlined"
                icon="pencil"
                onPress={() => {
                  handleEdit({
                    textField: "name",
                    value: get(user, "firstName", ""),
                    label: "Name",
                  });
                }}
              >
                Edit
              </Chip>

              {/* <Button onPress={() => {}} icon="minus" mode="contained">
                abc
              </Button>
              <Button mode="outlined">abc</Button>
              <Button onPress={() => {}} icon="plus" mode="contained">
                abc
              </Button> */}
            </Card.Actions>
          </Card>
          <Card style={style}>
            <Card.Content>
              <Paragraph>Email</Paragraph>
              <Chip icon="email" mode="outlined">
                {get(user, "email", "")}
              </Chip>
            </Card.Content>
            <Card.Actions>
              <Chip
                mode="outlined"
                icon="pencil"
                onPress={() => {
                  handleEdit({
                    textField: "email",
                    value: get(user, "email", ""),
                    label: "Email",
                  });
                }}
              >
                Edit
              </Chip>
            </Card.Actions>
          </Card>
          <Card style={style}>
            <Card.Content>
              <Paragraph>Contact No</Paragraph>
              <Chip icon="phone" mode="outlined">
                {get(user, "contactNo", "")
                  ? get(user, "contactNo", "")
                  : "Please add your Contact No"}
              </Chip>
            </Card.Content>
            <Card.Actions>
              <Chip
                mode="outlined"
                icon="pencil"
                onPress={() => {
                  handleEdit({
                    textField: "contactNo",
                    value: get(user, "contactNo", ""),
                    label: "Contact No",
                  });
                }}
              >
                Edit
              </Chip>
            </Card.Actions>
          </Card>

          <Card style={style}>
            <Card.Content>
              <Paragraph> Delivery Address</Paragraph>
              <Chip icon="home" mode="outlined">
                {get(user, "address", "")
                  ? get(user, "address", "")
                  : "Please add your address"}
              </Chip>
            </Card.Content>
            <Card.Actions>
              <Chip
                mode="outlined"
                icon="pencil"
                onPress={() => {
                  handleEdit({
                    textField: "address",
                    value: get(user, "address", ""),
                    label: "address",
                  });
                }}
              >
                Edit
              </Chip>
            </Card.Actions>
          </Card>
        </View>
        {/* <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          Custom React Navigate Drawer
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.aboutreact.com
        </Text> */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
