import { combineReducers, configureStore } from '@reduxjs/toolkit';
import modalRducer from './reducer/modalRducer';
import postReducer from './reducer/postReducer';
import userReducer from './reducer/userReducer';

export const store = configureStore({
  reducer: {
    modal: modalRducer,
    post: postReducer,
    user: userReducer,
  },
});
