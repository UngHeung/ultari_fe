import Link from 'next/link';
import { useState } from 'react';
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
  const [isShow, setIsShow] = useState(false);

  return (
    <header className={style.mainHeader}>
      <div className={style.headerWrap}>
        <section className={style.logoWrap}>
          <Logo type={'basic'} height={'100%'} setIsShow={setIsShow} />
        </section>
        <button
          className={style.hamburger}
          onClick={() => setIsShow(prev => !prev)}
        >
          메뉴
        </button>
        <div
          className={`${style.mobileMenuWrap} ${isShow ? style.isShow : ''}`}
        >
          <section className={style.navWrap}>
            <Nav setIsShow={setIsShow} />
          </section>
          <section className={style.user}>
            {isLoggedIn ? (
              <div className={style.isLoggedIn}>
                <Link
                  onClick={() => setIsShow(false)}
                  href={`/user/my`}
                >{`${userName}님`}</Link>
                <div className={style.line}></div>
                <Link onClick={() => setIsShow(false)} href={'/logout'}>
                  {' '}
                  로그아웃
                </Link>
              </div>
            ) : (
              <div className={style.isLoggedOut}>
                <Link onClick={() => setIsShow(false)} href={'/login'}>
                  로그인
                </Link>
                <div className={style.line}></div>
                <Link onClick={() => setIsShow(false)} href={'/sign'}>
                  회원가입
                </Link>
                <div className={style.line}></div>
                <Link
                  onClick={() => setIsShow(false)}
                  href={'/forgot/password'}
                >
                  계정 찾기
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </header>
  );
};

export default Header;
