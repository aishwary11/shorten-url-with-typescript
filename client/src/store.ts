import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, Reducer } from 'redux';
import { FLUSH, KEY_PREFIX, PAUSE, PERSIST, PersistConfig, Persistor, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
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
        ignoredActions: [KEY_PREFIX, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export const persistor: Persistor = persistStore(store);
