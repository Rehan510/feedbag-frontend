// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import * as React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Chip,
  Text,
  Checkbox,
} from "react-native-paper";
import Header from "../../components/Header";
import moment from "moment";
import { get } from "lodash";
import { useSelector } from "react-redux";
import { RadioButton } from "react-native-paper";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const ViewCart = ({ navigation, preOrders, handleStatus }) => {
  const { order } = useSelector((state) => state.feed);
  const cardGap = 16;
  const [accountType, setAccountType] = React.useState("pending");
  const getTotal = (items) => {
    let total = 0;
    items.forEach((element) => {
      total = total + element.price;
    });
    return total;
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Header>Customer Orders</Header>
        {preOrders.map((dat, index) => {
          return (
            <Card style={{ marginTop: 20 }} key={`his${index}`}>
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Title>
                    <Header>
                      {dat.status === "complete"
                        ? "Order Delivered"
                        : "New Order"}
                    </Header>
                  </Title>
                  <Chip mode="outlined">{`Total Rs:${getTotal(
                    dat.orderedItems
                  )}`}</Chip>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 20,
                  }}
                >
                  <Text>{moment(dat.createdAt).format("MMM DD, HH:mm")}</Text>

                  <Chip
                    selectedColor={dat.status === "complete" ? "green" : "red"}
                    mode="flat"
                    icon={dat.status === "complete" ? "check" : "information"}
                  >{`${dat.status}`}</Chip>
                </View>

                {dat.orderedItems.map((d, i) => {
                  return (
                    <View style={styles.row} key={`p${i}`}>
                      <Chip mode="outlined">{d.name}</Chip>
                    </View>
                  );
                })}

                <Paragraph>contactNo</Paragraph>
                <Chip icon="phone" mode="outlined">
                  {get(dat, "contactNo", "")}
                </Chip>
                <Paragraph>Delivery Address</Paragraph>
                <Chip icon="home" mode="outlined">
                  {get(dat, "deliveryAddress", "")}
                </Chip>
                <Paragraph>Delivered</Paragraph>
                <Checkbox
                  status={dat.status === "complete" ? "checked" : "unchecked"}
                  onPress={() => {
                    handleStatus(dat.id, dat.status);
                  }}
                />
              </Card.Content>
              <Card.Actions></Card.Actions>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewCart;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
});
