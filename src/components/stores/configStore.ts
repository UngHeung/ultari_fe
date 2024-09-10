import { configureStore } from '@reduxjs/toolkit';
import modalRducer from './reducer/modalRducer';
import postReducer from './reducer/postReducer';

export const store = configureStore({
  reducer: {
    modal: modalRducer,
    post: postReducer,
  },
});
