import { configureStore } from "@reduxjs/toolkit";
import urlSlice from "./slice/urlSlice";

const store = configureStore({
  reducer: {
    urlReducer: urlSlice
  },
  devTools: true
});

export default store; 