import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import userInfoReducer from "./features/userInfo/userInfoSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userInfo: userInfoReducer,
  },
});

store.subscribe((state) => {
  console.log(state);
});
