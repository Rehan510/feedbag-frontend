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

import { get } from "lodash";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const ItemCards = ({ restaurant, data, handleView, navigation, order }) => {
  const cardGap = 16;
  console.log("items");
  console.log(data);
  const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Card>
          <Card.Cover source={{ uri: get(restaurant, "picUrl", null) }} />

          <Card.Content>
            <Title>
              <Header>{get(restaurant, "name", "")}</Header>
            </Title>
            <Paragraph>{get(restaurant, "description", "")}</Paragraph>
          </Card.Content>
          <Card.Actions></Card.Actions>
        </Card>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {data.map((items, index) => {
            return (
              <View
                key={index}
                style={{
                  marginTop: cardGap,
                  marginLeft: index % 2 !== 0 ? cardGap : 0,
                  width: cardWidth,
                  backgroundColor: "white",
                  borderRadius: 16,
                  shadowOpacity: 0.2,
                  alignItems: "center",
                }}
              >
                <Card>
                  <Card.Title title={get(items, "name", "")} />
                  <Card.Cover source={{ uri: get(items, "picUrl", null) }} />
                  <Card.Content>
                    <Paragraph>
                      <Chip
                      // icon="information"
                      >
                        {`Rs:${get(items, "price", "")}`}
                      </Chip>
                    </Paragraph>
                    <Paragraph>{get(items, "description", "")}</Paragraph>
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      onPress={() => {
                        handleView(items, true);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      onPress={() => {
                        handleView(items, false);
                      }}
                    >
                      Add
                    </Button>
                  </Card.Actions>
                </Card>
              </View>
            );
          })}
        </View>
      </ScrollView>
      {order.length > 0 ? (
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("ViewCart");
          }}
        >
          View your cart
        </Button>
      ) : null}
    </SafeAreaView>
  );
};

export default ItemCards;
