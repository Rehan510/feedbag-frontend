import React, { useEffect } from "react";
import { View } from "react-native";
import { Button, Paragraph, Dialog, Portal, Card } from "react-native-paper";
import { get } from "lodash";
const ItemDialog = ({ hideDialog, showDialog, show, data }) => {
  return (
    <View>
      <Button onPress={showDialog}>Show Dialog</Button>
      <Portal>
        <Dialog visible={show} onDismiss={hideDialog}>
          {/* <Dialog.Title>Alert</Dialog.Title> */}
          <Dialog.Content>
            <Card>
              <Card.Cover source={{ uri: get(data, "picUrl", null) }} />
              <Card.Title title={get(data, "name", "")} />
              <Card.Content>
                <Paragraph>{get(data, "description", "")}</Paragraph>
              </Card.Content>
              <Card.Actions></Card.Actions>
            </Card>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
            <Button onPress={hideDialog}>+</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ItemDialog;
