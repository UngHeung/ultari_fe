import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyInfo } from '../auth/functions/getMyInfo';
import Modal from '../modal/Modal';
import { SliceOptions } from '../stores/constants/stateOptions';
import { setUser } from '../stores/reducer/userReducer';
import Footer from './layouts/Footer';
import Header from './layouts/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.user.isLoggedIn,
  );
  const modalIsShow = useSelector(
    (state: SliceOptions) => state.modal?.modalIsShow,
  );

  useEffect(() => {
    if (isLoggedIn) {
      return;
    }

    const checkUser = async () => {
      const data = await getMyInfo();
      dispatch(setUser({ ...data, isLoggedIn: true }));
    };
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      {children}
      <Footer />
      {modalIsShow && <Modal />}
    </>
  );
};

export default Layout;
