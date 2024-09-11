import { combineReducers, configureStore } from '@reduxjs/toolkit';
import modalRducer from './reducer/modalRducer';
import postReducer from './reducer/postReducer';
import userReducer from './reducer/userReducer';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
  modal: modalRducer,
  post: postReducer,
  user: userReducer,
});

const persistConfig = {
  timeout: 100,
  key: 'root',
  storage,
  whitelist: ['user', 'post', 'modal'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
