import Link from 'next/link';
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
        <section className={style.user}>
          {isLoggedIn ? (
            <div className={style.isLoggedIn}>
              <Link href={`/user/my`}>{`${userName}님`}</Link>
              <div className={style.line}></div>
              <Link href={'/logout'}> 로그아웃</Link>
            </div>
          ) : (
            <div className={style.isLoggedOut}>
              <Link href={'/login'}>로그인</Link>
              <div className={style.line}></div>
              <Link href={'/sign'}>회원가입</Link>
              <div className={style.line}></div>
              <Link href={'/forgot/password'}>계정 찾기</Link>
            </div>
          )}
        </section>
      </div>
    </header>
  );
};

export default Header;
