import React from 'react';
import style from '../styles/footer.module.css';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className={style.mainFooter}>
      <div className={style.footerWrap}>
        <Logo type={'small'} scale={30} />
        {'푸터입니다.'}
      </div>
    </footer>
  );
};

export default Footer;
