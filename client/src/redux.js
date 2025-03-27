// src/redux.js - Kiểm tra cấu trúc export
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './store/reducers/rootReducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user', 'tarot'] // Thêm 'tarot' vào whitelist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;