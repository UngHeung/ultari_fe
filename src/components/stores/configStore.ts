import { configureStore } from '@reduxjs/toolkit';
import modalRducer from './reducer/modalRducer';

export const store = configureStore({
  reducer: {
    modal: modalRducer,
  },
});
