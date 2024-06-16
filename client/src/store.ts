import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import urlSlice from './slice/urlSlice';
import userSlice from './slice/userSlice';

const reducer = combineReducers({
  urlReducer: urlSlice,
  userReducer: userSlice,
});

const store = configureStore({
  reducer,
  // devTools: process.env.NODE_ENV !== 'production',
});
export default store;
