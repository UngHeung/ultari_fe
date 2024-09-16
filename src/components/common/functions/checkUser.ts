import { getMyInfo } from '@/components/auth/functions/getMyInfo';
import { setUser } from '@/components/stores/reducer/userReducer';
import { Dispatch } from '@reduxjs/toolkit';

export const checkUser = async (dispatch: Dispatch) => {
  if (!localStorage.getItem('refreshToken')) return;

  const response = await getMyInfo();

  if (response.success) {
    dispatch(setUser({ ...response.data, isLoggedIn: true }));
  }
};
