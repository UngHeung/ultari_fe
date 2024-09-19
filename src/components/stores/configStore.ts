import { configureStore } from '@reduxjs/toolkit';
import modalRducer from './reducer/modalRducer';
import PostListReducer from './reducer/PostListReducer';
import postReducer from './reducer/postReducer';
import userReducer from './reducer/userReducer';

export const store = configureStore({
  reducer: {
    modal: modalRducer,
    post: postReducer,
    postList: PostListReducer,
    user: userReducer,
  },
});
