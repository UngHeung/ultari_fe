import { reissueAccessToken, reissueRefreshToken } from '@/apis/reissueToken';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import React, { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getUserDataFromToken from '../auth/functions/getUserDataFromToken';
import {
  setAccessToken,
  setRefreshToken,
} from '../auth/functions/tokenInteract';
import Modal from '../modal/Modal';
import { SliceOptions } from '../stores/interfaces/stateInterface';
import { setUser } from '../stores/reducer/userReducer';
import Footer from './layouts/Footer';
import Header from './layouts/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const modalIsShow = useSelector(
    (state: SliceOptions) => state.modal?.modalIsShow,
  );

  const isLoggedIn: boolean = useSelector(
    (state: SliceOptions) => state.logged.isLoggedIn,
  );
  const profile = useSelector((state: SliceOptions) => state.user.path);

  useEffect(() => {
    (async () => {
      await handleReload(dispatch, isLoggedIn, router);
    })();
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} profile={profile ?? ''} />
      {children}
      <Footer />
      {/* <Footer /> */}
      {modalIsShow && <Modal />}
    </>
  );
};

async function handleReload(
  dispatch: Dispatch<any>,
  isLoggedIn: boolean,
  router: AppRouterInstance,
) {
  if (!isLoggedIn) return;

  try {
    const accessToken = await reissueAccessToken();
    const refreshToken = await reissueRefreshToken();

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    const userData = getUserDataFromToken();

    dispatch(setUser(userData));
  } catch (error) {
    router.push('/logout');
  }
}

export default Layout;
