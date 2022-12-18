import { createSlice } from "@reduxjs/toolkit";
const defaultStates = {
  test: "REHAN SHAKEEL",
  isLogin: false,
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
  },
});

export const { setTest, setIsLogin } = feed.actions;
export default feed.reducer;
