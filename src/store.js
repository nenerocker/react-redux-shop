import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import { useReducer } from "react";
import reducer from "./reducers/userSlice";

const rootReducer ={
  cart: useReducer
}

export const store = configureStore({
  reducer: {
    user: userSlice,
    reducer: rootReducer
  },
});
export default store;