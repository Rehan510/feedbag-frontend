import React, { useEffect } from "react";
import ItemCards from "./ItemsCard";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import { setSelectedItem, setOrder } from "../reducers/feed";
import { useSelector, useDispatch } from "react-redux";
import ItemDialog from "./ItemDialog";
export default function Items({ navigation }) {
  const [show, setShow] = React.useState(false);
  const [no, setNo] = React.useState(0);
  const dispatch = useDispatch();
  const showDialog = () => setShow(true);

  const hideDialog = () => setShow(false);
  const { selectedRestaurant, restaurantItems, selectedItem, order } =
    useSelector((state) => state.feed);
  const handleView = (item) => {
    dispatch(setSelectedItem(item));
    showDialog();
  };
  const addItem = (item) => {
    let preOrders = [...order];
    preOrders.push(item);
    dispatch(setOrder(preOrders));
  };
  const removeItem = (item) => {
    const index = order.findIndex((preItem) => preItem.id === item.id);
    let preOrders = [...order];
    if (index > -1) {
      // only splice array when item is found
      preOrders.splice(index, 1); // 2nd parameter means remove one item only
    }
    dispatch(setOrder(preOrders));
  };

  useEffect(() => {
    const currentItemTotalPiece = order.filter(
      (item, index) => item.id === selectedItem.id
    );
    setNo(currentItemTotalPiece.length);
  }, [order, selectedItem]);
  return (
    <>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <ItemDialog
        show={show}
        hideDialog={hideDialog}
        showDialog={showDialog}
        data={selectedItem}
        handleView={handleView}
        total={no}
        addItem={addItem}
        removeItem={removeItem}
      />
      <ItemCards
        restaurant={selectedRestaurant}
        data={restaurantItems}
        showDialog={showDialog}
        handleView={handleView}
        navigation={navigation}
        order={order}
        
      />
    </>
  );
}
