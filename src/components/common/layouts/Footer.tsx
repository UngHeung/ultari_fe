import style from '../styles/footer.module.css';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className={style.mainFooter}>
      <div className={style.footerWrap}>
        <section className={style.logoWrap}>
          <Logo type={'small'} width={'50px'} />
        </section>
        <section className={style.contentWrap}>{'푸터입니다.'}</section>
      </div>
    </footer>
  );
};

export default Footer;
