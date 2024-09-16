import { Dispatch } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken } from '../auth/functions/tokenInteract';
import Modal from '../modal/Modal';
import { SliceOptions } from '../stores/constants/stateOptions';
import { setUser, UserOptions } from '../stores/reducer/userReducer';
import Footer from './layouts/Footer';
import Header from './layouts/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const modalIsShow = useSelector(
    (state: SliceOptions) => state.modal?.modalIsShow,
  );
  const user = useSelector((state: SliceOptions) => state.user);

  useEffect(() => {
    window.addEventListener('beforeunload', event => {
      event.preventDefault();
      handleUnload(dispatch, user);
    });

    return () => {
      window.removeEventListener('beforeunload', event => {
        event.preventDefault();
        handleUnload(dispatch, user);
      });
    };
  }, []);

  return (
    <>
      <Header userName={user.name} isLoggedIn={user.isLoggedIn} />
      {children}
      <Footer />
      {modalIsShow && <Modal />}
    </>
  );
};

function saveUserInStorage(user: UserOptions) {
  localStorage.setItem('myInfo', JSON.stringify(user));
}

function getUserInStorage() {
  return localStorage.getItem('myInfo')?.toString();
}

function removeUserInStorage() {
  localStorage.removeItem('myInfo');
}

async function handleUnload(dispatch: Dispatch, user: UserOptions) {
  if (!getRefreshToken()) return;

  console.log('dr -> ', user);

  if (user.isLoggedIn) {
    saveUserInStorage(user);
  } else {
    const user = getUserInStorage();
    dispatch(setUser(user));
    removeUserInStorage();
  }
}

export default Layout;
