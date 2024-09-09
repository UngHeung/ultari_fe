import React from 'react';
import Logo from './Logo';
import Nav from './Nav';
import style from '../styles/header.module.css';

const Header = () => {
  return (
    <header className={style.mainHeader}>
      <div className={style.headerWrap}>
        <section className={style.logoWrap}>
          <Logo type={'basic'} />
        </section>
        <section className={style.navWrap}>
          <Nav />
        </section>
      </div>
    </header>
  );
};

export default Header;
