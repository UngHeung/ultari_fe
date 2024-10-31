import { reissueAccessToken, reissueRefreshToken } from '@/apis/reissueToken';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import getUserDataFromToken from '../auth/functions/getUserDataFromToken';
import {
  setAccessToken,
  setRefreshToken,
} from '../auth/functions/tokenInteract';
import Modal from '../modal/Modal';
import SearchForm from '../post/components/SearchForm';
import useModalStore, { ModalStore } from '../stores/modal/modalStore';
import useLoggedStore, { LoggedStore } from '../stores/user/loggedStore';
import useUserStore, {
  UserStore,
  UserStoreOption,
} from '../stores/user/userStore';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import MenuBox from './layouts/MenuBox';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);
  const setUser = useUserStore((state: UserStore) => state.setUser);
  const modalIsShow = useModalStore(
    (state: ModalStore) => state.modal.modalIsShow,
  );

  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await handleReload(setUser, isLoggedIn, router);
    })();
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <MenuBox />
      {children}
      <Footer setIsSearching={setIsSearching} />
      {modalIsShow && <Modal />}
      {isSearching && <SearchForm setIsSearching={setIsSearching} />}
    </>
  );
};

async function handleReload(
  setUser: (user: UserStoreOption) => void,
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

    setUser(userData);
  } catch (error) {
    router.push('/logout');
  }
}

export default Layout;
