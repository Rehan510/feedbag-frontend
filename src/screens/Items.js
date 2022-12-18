import React from "react";
import ItemCards from "./ItemsCard";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import { setSelectedItem } from "../reducers/feed";
import { useSelector, useDispatch } from "react-redux";
import ItemDialog from "./ItemDialog";
export default function Items({ navigation }) {
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();
  const showDialog = () => setShow(true);

  const hideDialog = () => setShow(false);
  const { selectedRestaurant, restaurantItems, selectedItem } = useSelector(
    (state) => state.feed
  );
  // console.log(navigation);
  const handleView = (item) => {
    dispatch(setSelectedItem(item));
    showDialog();
  };
  console.log("selectedRestaurant");
  console.log(selectedRestaurant);

  return (
    <>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <ItemDialog
        show={show}
        hideDialog={hideDialog}
        showDialog={showDialog}
        data={selectedItem}
        handleView={handleView}
      />
      <ItemCards
        restaurant={selectedRestaurant}
        data={restaurantItems}
        showDialog={showDialog}
        handleView={handleView}
      />
    </>
  );
}
