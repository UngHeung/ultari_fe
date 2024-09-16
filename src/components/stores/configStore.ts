import { configureStore } from '@reduxjs/toolkit';
import modalRducer from './reducer/modalRducer';
import postReducer from './reducer/postReducer';
import userReducer from './reducer/userReducer';
import PostListReducer from './reducer/PostListReducer';

export const store = configureStore({
  reducer: {
    modal: modalRducer,
    post: postReducer,
    postList: PostListReducer,
    user: userReducer,
  },
});
