import React, { useEffect } from "react";
import { View } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Card,
  SegmentedButtons,
  Chip,
  Title,
} from "react-native-paper";
import Header from "../components/Header";
import { get } from "lodash";
import PlaceOrder from "./PlaceOrder";
const ItemDialog = ({
  hideDialog,
  showDialog,
  show,
  data,
  total,
  addItem,
  removeItem,
}) => {
  return (
    <View>
      <Portal>
        <Dialog visible={show} onDismiss={hideDialog}>
          <Dialog.Content>
            <Card>
              <Card.Content>
                <PlaceOrder />

                <Paragraph>{get(data, "description", "")}</Paragraph>
                <Chip icon="plus">{`Rs:${get(data, "price", "")}`}</Chip>
              </Card.Content>
              <Card.Actions>
                <Button
                  onPress={() => {
                    removeItem(data);
                  }}
                  icon="minus"
                  mode="contained"
                ></Button>
                <Button mode="outlined">{total}</Button>
                <Button
                  onPress={() => {
                    addItem(data);
                  }}
                  icon="plus"
                  mode="contained"
                ></Button>
              </Card.Actions>
            </Card>
          </Dialog.Content>
          <Dialog.Actions>
            <Chip mode="outlined">
              {`Total Rs:${total * get(data, "price", "")}`}
            </Chip>
            <Button onPress={hideDialog}>Add to cart</Button>
            {/* <Button onPress={hideDialog} icon="plus" mode="contained"></Button> */}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ItemDialog;
