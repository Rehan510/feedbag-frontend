import { createSlice } from "@reduxjs/toolkit";
const defaultStates = {
  test: "REHAN SHAKEEL",
  isLogin: false,
  restaurants: [],
  selectedRestaurant: null,
  restaurantItems: [],
  order: [],
  selectedItem: null,
  user: null,
};
export const feed = createSlice({
  name: "feed",
  initialState: defaultStates,
  reducers: {
    setTest: (state, action) => {
      return { ...state, test: action.test };
    },
    setIsLogin: (state, action) => {
      return { ...state, isLogin: action.payload };
    },
    setRestaurants: (state, action) => {
      return { ...state, restaurants: action.payload };
    },
    setSelectedRestaurant: (state, action) => {
      return { ...state, selectedRestaurant: action.payload };
    },
    setRestaurantItems: (state, action) => {
      return { ...state, restaurantItems: action.payload };
    },
    setOrder: (state, action) => {
      return { ...state, order: action.payload };
    },
    setSelectedItem: (state, action) => {
      return { ...state, selectedItem: action.payload };
    },
    setUser: (state, action) => {
      return { ...state, user: action.payload };
    },
  },
});

export const {
  setTest,
  setIsLogin,
  setRestaurants,
  setRestaurantItems,
  setSelectedRestaurant,
  setOrder,
  setSelectedItem,
  setUser,
} = feed.actions;
export default feed.reducer;
