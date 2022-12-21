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
import TextInput from "../components/TextInput";
const ProfileEditDialog = ({
  show,
  data,
  handleInput,
  hideDialog,
  updateProfile,
}) => {
  return (
    <View>
      <Portal>
        <Dialog
          visible={show}
          onDismiss={() => {
            hideDialog();
          }}
        >
          <Dialog.Content>
            <Card>
              <Card.Content>
                <Title>{`Update ${data["label"]}`}</Title>
                <TextInput
                  label={data["label"]}
                  returnKeyType="next"
                  value={data["value"]}
                  onChangeText={(text) => {
                    handleInput(text);
                  }}
                  error={""}
                  errorText={""}
                />
              </Card.Content>
              <Card.Actions>
                <Button
                  onPress={() => {
                    updateProfile(data);
                  }}
                  mode="contained"
                >
                  Save
                </Button>
              </Card.Actions>
            </Card>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                hideDialog();
              }}
              mode="contained"
            >
              Close
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ProfileEditDialog;
