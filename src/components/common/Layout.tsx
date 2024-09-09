import React from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Modal from '../modal/Modal';
import { useSelector } from 'react-redux';
import { SliceOptions } from '../stores/constants/stateOptions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const modalIsShow = useSelector(
    (state: SliceOptions) => state.modal?.modalIsShow,
  );

  return (
    <>
      <Header />
      {children}
      <Footer />
      {/* <Modal /> */}
      {modalIsShow && <Modal />}
    </>
  );
};

export default Layout;
