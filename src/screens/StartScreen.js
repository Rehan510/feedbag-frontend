import React, { useCallback, useEffect } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function StartScreen({ navigation }) {
  const clearAll = useCallback(async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log("Done.");
  }, []);
  useEffect(() => {
    // clearAll();
  }, [clearAll]);
  return (
    <Background>
      <Logo />
      <Header>Feed Bag</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>
    </Background>
  );
}
