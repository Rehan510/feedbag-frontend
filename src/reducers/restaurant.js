import { createSlice } from "@reduxjs/toolkit";
const defaultStates = {
  test: "REHAN SHAKEEL",
  userRestaurant: null,
};
export const restaurant = createSlice({
  name: "restaurant",
  initialState: defaultStates,
  reducers: {
    setUserRestaurant: (state, action) => {
      return { ...state, userRestaurant: action.payload };
    },
  },
});

export const { setUserRestaurant } = restaurant.actions;
export default restaurant.reducer;
