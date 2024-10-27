import UserProfile from '@/components/user/components/UserProfile';
import Link from 'next/link';
import { useState } from 'react';
import style from '../styles/header.module.css';
import Nav from './Nav';

const Header = ({
  isLoggedIn,
  profile,
}: {
  isLoggedIn: boolean;
  profile: string;
}) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <header className={style.mainHeader}>
      <div className={style.headerWrap}>
        <section className={style.buttonWrap}>
          <button
            className={style.hamburger}
            onClick={() => setIsShow(prev => !prev)}
          >
            {hamburger}
          </button>
        </section>
        <section className={style.profileWrap}>
          {isLoggedIn ? (
            <Link onClick={() => setIsShow(false)} href={`/user/my`}>
              <UserProfile path={profile} size={30} />
            </Link>
          ) : (
            <Link onClick={() => setIsShow(false)} href={'/login'}>
              로그인
            </Link>
          )}
        </section>
      </div>

      <div className={`${style.mobileMenuWrap} ${isShow ? style.isShow : ''}`}>
        <section className={style.navWrap}>
          <Nav setIsShow={setIsShow} isLoggedIn={isLoggedIn} />
        </section>
        <section className={style.user}>
          <div className={style.isLoggedOut}>
            <div className={style.line}></div>
            <Link onClick={() => setIsShow(false)} href={'/sign'}>
              회원가입
            </Link>
            <div className={style.line}></div>
            <Link onClick={() => setIsShow(false)} href={'/forgot/password'}>
              계정 찾기
            </Link>
          </div>
        </section>
      </div>
    </header>
  );
};

export default Header;

const hamburger = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="5" width="20" height="2" rx="1" fill="white" />
    <rect x="2" y="11" width="20" height="2" rx="1" fill="white" />
    <rect x="2" y="17" width="20" height="2" rx="1" fill="white" />
  </svg>
);
