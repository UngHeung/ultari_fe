import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../modal/Modal';
import { SliceOptions } from '../stores/interfaces/stateInterface';
import Header from './layouts/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const modalIsShow = useSelector(
    (state: SliceOptions) => state.modal?.modalIsShow,
  );
  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.user.isLoggedIn ?? false,
  );
  const userName = useSelector((state: SliceOptions) => state.user.name);

  // useEffect(() => {
  //   (async () => {
  //     await handleReload(dispatch, isLoggedIn);
  //   })();
  // }, []);

  return (
    <>
      <Header userName={userName ?? '불러오기 오류'} isLoggedIn={isLoggedIn} />
      {children}
      {/* <Footer /> */}
      {modalIsShow && <Modal />}
    </>
  );
};

// async function handleReload(dispatch: Dispatch, isLoggedIn: boolean) {
//   if (isLoggedIn) return;

//   try {
//     const accessToken = await reissueAccessToken();
//     const refreshToken = await reissueRefreshToken();

//     setAccessToken(accessToken);
//     setRefreshToken(refreshToken);

//     const userData = getUserDataFromToken();

//     dispatch(setUser({ ...userData, isLoggedIn: true }));
//   } catch (error) {
//     return;
//   }
// }

export default Layout;
