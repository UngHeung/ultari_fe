import React from 'react';
import Logo from './Logo';
import Nav from './Nav';
import style from '../styles/header.module.css';

const Header = () => {
  return (
    <header className={style.mainHeader}>
      <Logo type={'basic'} />
      <Nav />
    </header>
  );
};

export default Header;
