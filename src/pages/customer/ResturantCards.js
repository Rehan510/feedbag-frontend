// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import * as React from "react";
import { View, Text, SafeAreaView, ScrollView, Dimensions } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { get } from "lodash";
import Header from "../../components/Header";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const ResturantCards = ({ data, handleSelectedRestaurant }) => {
  const cardGap = 10;
  const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            // flexDirection: "column",
            padding: 15,
            // flexDirection: "row",
            // flexWrap: "wrap",
            // justifyContent: "space-evenly",
          }}
        >
          {data.map((res, index) => {
            return (
              <View key={index} style={{ marginTop: 15 }}>
                <Card
                  onPress={() => {
                    handleSelectedRestaurant(res);
                  }}
                >
                  <Card.Cover source={{ uri: get(res, "picUrl", null) }} />

                  {/* <Card.Title title= /> */}
                  <Card.Content>
                    <Title>
                      <Header>{get(res, "name", "")}</Header>
                    </Title>
                    <Paragraph>{get(res, "description", "")}</Paragraph>
                  </Card.Content>
                  <Card.Actions></Card.Actions>
                </Card>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResturantCards;
