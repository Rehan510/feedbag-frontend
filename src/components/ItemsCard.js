// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import * as React from "react";
import { View, Text, SafeAreaView, ScrollView, Dimensions } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const ItemCards = ({ navigation }) => {
  const cardGap = 16;

  const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingTop: 100,
          }}
        >
          {[1, 2, 4, 5, 6, 6].map((d, index) => {
            return (
              <View
                key={index}
                style={{
                  marginTop: cardGap,
                  marginLeft: index % 2 !== 0 ? cardGap : 0,
                  width: cardWidth,
                  // height: 180,
                  backgroundColor: "white",
                  borderRadius: 16,
                  shadowOpacity: 0.2,
                  // justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card>
                  <Card.Title
                    title="Card Title"
                    subtitle="Card Subtitle"
                    // left={LeftContent}
                  />
                  <Card.Content>
                    <Title>Card titleeeee</Title>
                    <Paragraph>Card content</Paragraph>
                  </Card.Content>
                  <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                  <Card.Actions>
                    <Button
                      onPress={() => {
                        navigation.navigate("LoginScreenn");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button>Ok</Button>
                  </Card.Actions>
                </Card>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemCards;
