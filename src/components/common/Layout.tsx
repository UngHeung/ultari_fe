import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../modal/Modal';
import { SliceOptions } from '../stores/constants/stateOptions';
import { checkUser } from './functions/checkUser';
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
    !isLoggedIn && checkUser(dispatch);
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
