import { reissueAccessToken, reissueRefreshToken } from '@/apis/reissueToken';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import getUserDataFromToken from '../auth/functions/getUserDataFromToken';
import {
  setAccessToken,
  setRefreshToken,
} from '../auth/functions/tokenInteract';
import Modal from '../modal/Modal';
import SearchForm from '../post/components/SearchForm';
import useIsShowStore, { IsShowStore } from '../stores/common/isShowStore';
import useModalStore, { ModalStore } from '../stores/modal/modalStore';
import useLoggedStore, { LoggedStore } from '../stores/user/loggedStore';
import useUserStore, {
  UserStore,
  UserStoreOption,
} from '../stores/user/userStore';
import Footer from './layouts/Footer';
import Header from './layouts/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);
  const isHydrated = useLoggedStore((state: LoggedStore) => state.isHydrated);
  const setUser = useUserStore((state: UserStore) => state.setUser);
  const modalIsShow = useModalStore(
    (state: ModalStore) => state.modal.modalIsShow,
  );
  const searchIsShow = useIsShowStore(
    (state: IsShowStore) => state.searchIsShow,
  );

  useEffect(() => {
    if (isHydrated) {
      if (!isLoggedIn) return;

      handleReload(setUser, router);
    }
  }, [isHydrated]);

  return (
    <>
      <Header />
      {children}
      <Footer />
      {modalIsShow && <Modal />}
      {searchIsShow && <SearchForm />}
    </>
  );
};

export async function handleReload(
  setUser: (user: UserStoreOption) => void,
  router: AppRouterInstance,
) {
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
