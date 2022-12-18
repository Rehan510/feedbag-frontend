import React from "react";
import ItemCards from "../components/ItemsCard";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import { KeyboardAvoidingView } from "react-native";
export default function Items({ navigation }) {
  console.log(navigation);
  return (
    <>
      <BackButton goBack={navigation.goBack} />
      <ItemCards />
    </>
  );
}
