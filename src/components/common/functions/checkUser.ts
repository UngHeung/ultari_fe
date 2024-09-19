// import handleGetMyInfo from '@/components/auth/handlers/handleGetMyInfo';
// import { setUser } from '@/components/stores/reducer/userReducer';
// import { Dispatch } from '@reduxjs/toolkit';

// const checkUser = async (dispatch: Dispatch) => {
//   if (!localStorage.getItem('refreshToken')) return;

//   try {
//     const response = await handleGetMyInfo();

//     if (response.success) {
//       dispatch(setUser({ ...response.data, isLoggedIn: true }));
//     }
//   } catch (error) {
//     return;
//   }
// };

// export default checkUser;
