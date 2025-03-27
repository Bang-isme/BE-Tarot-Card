// src/store/reducers/rootReducer.js
// Thêm tarotReducer vào rootReducer

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducers';
import tarotReducer from './tarotReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  tarot: tarotReducer
  // Giữ nguyên các reducers khác
});

export default rootReducer;