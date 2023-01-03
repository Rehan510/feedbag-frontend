import { FAB, Provider as PaperProvider } from "react-native-paper";

import { Alert, StyleSheet, SafeAreaView, Text } from "react-native";

export default function Main({ navigation }) {
  const showAlert = () => {
    // Alert.alert("onPress Called...");
    navigation.navigate("AddItem");
  };

  return (
    <FAB
      style={styles.fabStyle}
      animated={true}
      color="white"
      disabled={false}
      visible={true}
      loading={false}
      onLongPress={showAlert}
      small
      icon="plus"
      onPress={showAlert}
      // label='EXTENDED FAB'
    />
  );
}

const styles = StyleSheet.create({
  fabStyle: {
    position: "absolute",
    marginTop: 100,
    right: 50,
    bottom: 80,
    backgroundColor: "#e91e63",
    // width: 50,
    // height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
