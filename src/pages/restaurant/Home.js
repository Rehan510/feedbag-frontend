import React, { useEffect } from "react";
import ItemCards from "./ItemsCard";
import Background from "../../components/Background";
import BackButton from "../../components/BackButton";
import { setSelectedItem, setOrder } from "../../reducers/feed";
import { useSelector, useDispatch } from "react-redux";
import { getUserRestaurantWithItems } from "./restaurantAction";
import { Alert } from "react-native";
import { get } from "lodash";
import Fab from "./Fab";
import axios from "axios";
import config from "../../config/config";
import Restaurant from "./Restaurant";
// import ItemDialog from "./ItemDialog";

export default function Items({ navigation }) {
  const { userRestaurant } = useSelector((state) => state.restaurant);

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
  );
}
