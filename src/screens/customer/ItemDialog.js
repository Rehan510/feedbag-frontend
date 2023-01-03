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
import Header from "../../components/Header";
import { get } from "lodash";
const ItemDialog = ({
  hideDialog,
  showDialog,
  show,
  data,
  total,
  addItem,
  removeItem,
  isView,
}) => {
  return (
    <View>
      <Portal>
        <Dialog visible={show} onDismiss={hideDialog}>
          <Dialog.Content>
            <Card>
              <Card.Cover source={{ uri: get(data, "picUrl", null) }} />
              <Card.Content>
                <Title>
                  <Header>{get(data, "name", "")}</Header>
                </Title>
                <Paragraph>{get(data, "description", "")}</Paragraph>
                <Chip icon="plus">{`Rs:${get(data, "price", "")}`}</Chip>
              </Card.Content>
              <Card.Actions>
                {!isView && (
                  <>
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
                  </>
                )}
              </Card.Actions>
            </Card>
          </Dialog.Content>
          <Dialog.Actions>
            {!isView && (
              <>
                <Chip mode="outlined">
                  {`Total Rs:${total * get(data, "price", "")}`}
                </Chip>
                <Button onPress={hideDialog}>Add to cart</Button>
              </>
            )}

            {/* <Button onPress={hideDialog} icon="plus" mode="contained"></Button> */}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ItemDialog;
