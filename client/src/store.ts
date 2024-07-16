import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import urlReducer from './slice/urlslice';
import userReducer from './slice/userslice';

const reducer = combineReducers({
  urlReducer,
  userReducer,
});

const store = configureStore({
  reducer,
  // devTools: process.env.NODE_ENV !== 'production',
});
export default store;
