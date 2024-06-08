import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import urlSlice from "./slice/urlSlice";

const store = configureStore({
  reducer: {
    urlReducer: urlSlice
  },
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store; 