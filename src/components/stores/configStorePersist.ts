import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loggedReducer from './reducer/loggedReducer';
import modalRducer from './reducer/modalRducer';
import PostListReducer from './reducer/PostListReducer';
import postReducer from './reducer/postReducer';

const reducers = combineReducers({
  logged: loggedReducer,
  modal: modalRducer,
  post: postReducer,
  postList: PostListReducer,
});

const persistConfig = {
  timeout: 100,
  key: 'root',
  storage,
  whitelist: ['logged'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
