// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useState } from "react";
import { View, Text, SafeAreaView ,ScrollView} from "react-native";
import { Button, Paragraph, Card, Chip, Title } from "react-native-paper";
import Header from "../../components/Header";
import ProfileEditDialog from "../ProfileEditDialog";
import config from "../../config/config";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUserRestaurantWithItems } from "./restaurantAction";
import { get } from "lodash";
const Profile = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ textField: "", value: "", label: "" });
  const { userRestaurant } = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();

  const style = { marginTop: 20 };
  const updateProfile = async (userData) => {
    let payload = {
      restaurantId: userRestaurant.id,
      name: userRestaurant.name,
      description: userRestaurant.description,
      address: userRestaurant.address,
      description: userRestaurant.description,
      phoneNo: userRestaurant.phoneNo,
    };
    if (userData["textField"] === "name") {
      payload.name = userData["value"];
    }
    if (userData["textField"] === "address") {
      payload.address = userData["value"];
    }
    if (userData["textField"] === "phoneNo") {
      payload.phoneNo = userData["value"];
    }
    if (userData["textField"] === "description") {
      payload.description = userData["value"];
    }

   
   
    try {
      const response = await axios.put(
        `${config.apiUrl}/restaurant/update`,
        payload
      );
      setData({ textFied: "", value: "", label: "" });
      setShow(false);
      dispatch(getUserRestaurantWithItems());
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
   
    setData({ ...data, value: text });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
         <ScrollView>
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
          <Card>
            <Card.Cover source={{ uri: get(userRestaurant, "picUrl", null) }} />

            <Card.Content>
              <Title>
                {/* <Header>{get(userRestaurant, "name", "")}</Header> */}
              </Title>
              {/* <Paragraph>{get(userRestaurant, "description", "")}</Paragraph> */}
            </Card.Content>
            <Card.Actions>
              <Chip
                mode="outlined"
                icon="pencil"
                onPress={() => {
                  handleEdit({
                    textField: "name",
                    value: get(userRestaurant, "name", ""),
                    label: "Name",
                  });
                }}
              >
                Edit
              </Chip>
            </Card.Actions>
          </Card>
          <Card style={style}>
            <Card.Content>
              <Paragraph>Name</Paragraph>
              <Chip icon="human" mode="outlined">
                {get(userRestaurant, "name", "")}
              </Chip>
            </Card.Content>
            <Card.Actions>
              <Chip
                mode="outlined"
                icon="pencil"
                onPress={() => {
                  handleEdit({
                    textField: "name",
                    value: get(userRestaurant, "name", ""),
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
              <Paragraph>Address</Paragraph>
              <Chip icon="home" mode="outlined">
                {get(userRestaurant, "address", "")}
              </Chip>
            </Card.Content>
            <Card.Actions>
              <Chip
                mode="outlined"
                icon="pencil"
                onPress={() => {
                  handleEdit({
                    textField: "address",
                    value: get(userRestaurant, "address", ""),
                    label: "Address",
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
                {get(userRestaurant, "phoneNo", "")
                  ? get(userRestaurant, "phoneNo", "")
                  : "Please add your Contact No"}
              </Chip>
            </Card.Content>
            <Card.Actions>
              <Chip
                mode="outlined"
                icon="pencil"
                onPress={() => {
                  handleEdit({
                    textField: "phoneNo",
                    value: `${get(userRestaurant, "phoneNo", "")}`,
                    label: "Contact No",
                    numeric: true,
                  });
                }}
              >
                Edit
              </Chip>
            </Card.Actions>
          </Card>

          <Card style={style}>
            <Card.Content>
              <Paragraph> Description</Paragraph>
              <Chip icon="information" mode="outlined">
                {get(userRestaurant, "description", "")
                  ? get(userRestaurant, "description", "")
                  : "Please add description"}
              </Chip>
            </Card.Content>
            <Card.Actions>
              <Chip
                mode="outlined"
                icon="pencil"
                onPress={() => {
                  handleEdit({
                    textField: "description",
                    value: get(userRestaurant, "description", ""),
                    label: "description",
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
