// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import * as React from "react";
import { View, SafeAreaView, ScrollView, Dimensions } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Chip,
} from "react-native-paper";
import Header from "../../components/Header";
import { DataTable } from "react-native-paper";
import { get } from "lodash";
import { useSelector } from "react-redux";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const ViewCart = ({ navigation }) => {
  const { order } = useSelector((state) => state.feed);
  const cardGap = 16;
  let totalPrice = 0;
  let totalQuantity = 0;

  const optionsPerPage = [2, 3, 4];
  const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;

  order.forEach((data) => {
    totalPrice = totalPrice + data.price;
    totalQuantity = totalQuantity + 1;
  });
  
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
      {/* <ScrollView>
        <View>
          <Card>
            {[1, 2, 3].map((items, index) => {
              return (
                <View key={index}>
                  <Card.Title title="jj" />
                  <Card.Content>
                    <Paragraph>
                      <Chip
                      // icon="information"
                      >
                        {`Rs:12`}
                      </Chip>
                    </Paragraph>
                    <Paragraph>New</Paragraph>
                  </Card.Content>
                  <Card.Actions>
                    <Button onPress={() => {}}>View</Button>
                    <Button>Add</Button>
                  </Card.Actions>
                </View>
              );
            })}
          </Card>
        </View>
      </ScrollView> */}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Item</DataTable.Title>
          <DataTable.Title numeric>Rs</DataTable.Title>
          <DataTable.Title numeric>Quantity</DataTable.Title>
        </DataTable.Header>
        {order.map((data, index) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell>{data.name}</DataTable.Cell>
              <DataTable.Cell numeric>{data.price}</DataTable.Cell>
              <DataTable.Cell numeric>{data.quantity}</DataTable.Cell>
            </DataTable.Row>
          );
        })}

        <DataTable.Row>
          <DataTable.Cell>Total Rs</DataTable.Cell>
          <DataTable.Cell numeric>{totalPrice}</DataTable.Cell>
          <DataTable.Cell numeric>{totalQuantity}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("PlaceOrder");
        }}
      >
        Place your order
      </Button>
    </SafeAreaView>
  );
};

export default ViewCart;
