import React, { useEffect } from "react";
import ItemCards from "./ItemsCard";
import Background from "../../components/Background";
import BackButton from "../../components/BackButton";
import { setSelectedItem, setOrder } from "../../reducers/feed";
import { useSelector, useDispatch } from "react-redux";
import { getUserRestaurantWithItems } from "./restaurantAction";
import { Alert, StyleSheet,View,Text } from "react-native";
import { get } from "lodash";
import Fab from "./Fab";
import axios from "axios";
import config from "../../config/config";
import Restaurant from "./Restaurant";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
// import ItemDialog from "./ItemDialog";

export default function Items({ navigation }) {
  const { userRestaurant, isRestaurant } = useSelector(
    (state) => state.restaurant
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserRestaurantWithItems());
  }, []);
  const deleteItem = async (deleteItemId) => {
    try {
      const resp = await axios.delete(
        `${config.apiUrl}/item/delete?itemId=${deleteItemId}`
      );
      const data = get(resp, "data", null);
      if (!data.error) {
        Alert.alert(data.message);
        dispatch(getUserRestaurantWithItems());
      }
    } catch (error) {
      Alert.alert("something went wrong");
    }
  };
  return (
    <>
      {isRestaurant ? (
        <>
          {userRestaurant ? (
            <>
              <Fab navigation={navigation} />
              <ItemCards
                restaurant={userRestaurant}
                data={get(userRestaurant, "Items", [])}
                navigation={navigation}
                deleteItem={deleteItem}
              />
            </>
          ) : (
            <>
              <Restaurant navigation={navigation} />
            </>
          )}
        </>
      ) : (
        <View style={styles.middle}>
          <ActivityIndicator
            style={styles.middle}
            animating={true}
            color={"black"}
          />
          <Text style={styles.middle}> Please wait ...</Text>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  top: {
    flex: 0.3,
    backgroundColor: "grey",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    textAlign: "center",
    // backgroundColor: "beige",
    // borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: "pink",
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
