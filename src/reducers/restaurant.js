import { createSlice } from "@reduxjs/toolkit";
const defaultStates = {
  test: "REHAN SHAKEEL",
  userRestaurant: null,
  isRestaurant: false,
};
export const restaurant = createSlice({
  name: "restaurant",
  initialState: defaultStates,
  reducers: {
    setUserRestaurant: (state, action) => {
      return { ...state, userRestaurant: action.payload };
    },
    setIsRestaurant: (state, action) => {
      return { ...state, isRestaurant: action.payload };
    },
    resetAllRestaurant: () => {
      return defaultStates;
    },
  },
});

export const { setUserRestaurant, resetAllRestaurant, setIsRestaurant } =
  restaurant.actions;
export default restaurant.reducer;
