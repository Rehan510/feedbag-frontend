// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import * as React from "react";
import { View, Text, SafeAreaView, ScrollView, Dimensions } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const ResturantCards = ({ navigation }) => {
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
          {[1, 2, 3, 4, 5, 6, 7].map((d, index) => {
            return (
              <View key={index} style={{ marginTop: 15 }}>
                <Card>
                  <Card.Title
                    title="Card Title"
                    subtitle="Card Subtitle"
                    // left={LeftContent}
                  />
                  <Card.Content>
                    <Title>Card titlee</Title>
                    <Paragraph>Card content</Paragraph>
                  </Card.Content>
                  <Card
                    onPress={() => {
                      navigation.navigate("Items");
                    }}
                  >
                    <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                  </Card>
                  <Card.Actions>
                    <Button>Cancel</Button>
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

export default ResturantCards;
