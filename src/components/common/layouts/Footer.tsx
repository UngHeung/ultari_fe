import React from 'react';
import style from '../styles/footer.module.css';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className={style.mainFooter}>
      <div className={style.footerWrap}>
        <section className={style.logoWrap}>
          <Logo type={'small'} />
        </section>
        {'푸터입니다.'}
      </div>
    </footer>
  );
};

export default Footer;
