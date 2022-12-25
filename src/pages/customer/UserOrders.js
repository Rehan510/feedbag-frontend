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
} from "react-native-paper";
import Header from "../../components/Header";
import moment from "moment";
import { get } from "lodash";
import { useSelector } from "react-redux";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const ViewCart = ({ navigation, preOrders }) => {
  const { order } = useSelector((state) => state.feed);
  const cardGap = 16;

  // console.log(order)
  //   console.log(order.length, table.length,"table==================");

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
        {/* <Header>Orders History</Header> */}
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
                    <Header>{dat.orderFrom}</Header>
                  </Title>
                  <Chip mode="outlined">{`Total Rs:${getTotal(
                    dat.orderedItems
                  )}`}</Chip>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop:20
                  }}
                >
                  <Text>{moment(dat.createdAt).format("MMM DD, HH:mm")}</Text>
                  <Chip icon="information">{`Status:${dat.status}`}</Chip>
                </View>

                {dat.orderedItems.map((d, i) => {
                  return (
                    <View style={styles.row} key={`p${i}`}>
                      <Chip mode="outlined">{d.name}</Chip>
                      {/* <Text>Don’t have an account? </Text> */}
                    </View>
                  );

                  // <Paragraph>{d.name}</Paragraph>;
                })}

                {/* <Chip icon="plus">{`Rs:200`}</Chip> */}
              </Card.Content>
              <Card.Actions>
                {/* <Button
                  onPress={() => {}}
                  icon="minus"
                  mode="contained"
                ></Button>
                <Button mode="outlined">new</Button>
                <Button
                  onPress={() => {}}
                  icon="plus"
                  mode="contained"
                ></Button> */}
              </Card.Actions>
            </Card>
          );
        })}

        {/* <DataTable.Row>
          <DataTable.Cell>Total Rs</DataTable.Cell>
          <DataTable.Cell numeric>{totalPrice}</DataTable.Cell>
          <DataTable.Cell numeric>{totalQuantity}</DataTable.Cell>
        </DataTable.Row> */}
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
