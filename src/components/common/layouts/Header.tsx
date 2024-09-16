import style from '../styles/header.module.css';
import Logo from './Logo';
import Nav from './Nav';

const Header = ({
  isLoggedIn,
  userName,
}: {
  isLoggedIn: boolean;
  userName: string;
}) => {
  return (
    <header className={style.mainHeader}>
      <div className={style.headerWrap}>
        <section className={style.logoWrap}>
          <Logo type={'basic'} height={'100%'} />
        </section>
        <section className={style.navWrap}>
          <Nav />
        </section>
        <section>
          <span>{isLoggedIn && `${userName}님`}</span>
        </section>
      </div>
    </header>
  );
};

export default Header;
