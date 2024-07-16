import { Action, configureStore, Middleware, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers, Reducer } from 'redux';
import { FLUSH, PAUSE, PERSIST, PersistConfig, Persistor, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk, ThunkMiddleware } from 'redux-thunk';
import urlReducer from './slice/urlslice';
import userReducer from './slice/userslice';

interface RootState {
  url: ReturnType<typeof urlReducer>;
  user: ReturnType<typeof userReducer>;
}

const rootReducer: Reducer<RootState> = combineReducers({
  url: urlReducer,
  user: userReducer,
});

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export const persistor: Persistor = persistStore(store);
export type AppDispatch = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppMiddleware = Middleware<unknown, RootState>;
export type AppThunkMiddleware = ThunkMiddleware<RootState>;
