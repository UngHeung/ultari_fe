import React from 'react';
import Logo from './Logo';
import Nav from './Nav';
import style from '../styles/header.module.css';

const Header = () => {
  return (
    <header className={style.mainHeader}>
      <div className={style.headerWrap}>
        <Logo type={'basic'} scale={66.6} />
        <Nav />
      </div>
    </header>
  );
};

export default Header;
