import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userInfoSlice = createSlice({
  name: "user-info",
  initialState,
  reducers: {
    logInUser: (state, action) => {
      state.user = action.payload;
    },
    logOutUser: (state) => {
      state.user = {};
    },
  },
});

export const { logInUser, logOutUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;

// Action creators are generated for each case reducer function
