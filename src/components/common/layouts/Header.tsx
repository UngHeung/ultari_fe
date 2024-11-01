import useIsShowStore, {
  IsShowStore,
} from '@/components/stores/common/isShowStore';
import Link from 'next/link';
import style from '../styles/header.module.css';
import Logo from './Logo';
import Nav from './Nav';

const Header = () => {
  const menuIsShow = useIsShowStore((state: IsShowStore) => state.menuIsShow);
  const setMenuIsShow = useIsShowStore(
    (state: IsShowStore) => state.setMenuIsShow,
  );
  const toggleMenuIsShow = useIsShowStore(
    (state: IsShowStore) => state.toggleMenuIsShow,
  );
  const setSearchIsShow = useIsShowStore(
    (state: IsShowStore) => state.setSearchIsShow,
  );

  return (
    <header className={style.mainHeader}>
      <div className={style.headerWrap}>
        <section className={style.buttonWrap}>
          <button
            className={style.hamburger}
            onClick={() => {
              setSearchIsShow(false);
              toggleMenuIsShow();
            }}
          >
            {hamburger}
          </button>
        </section>
        <section className={style.logoWrap}>
          <Logo width={'80px'} height={'auto'} type={'small'} />
        </section>
      </div>

      <div
        className={`${style.mobileMenuWrap} ${menuIsShow ? style.isShow : ''}`}
      >
        <section className={style.navWrap}>
          <Nav />
        </section>
        <section className={style.user}>
          <div className={style.isLoggedOut}>
            <div className={style.line}></div>
            <Link onClick={() => setMenuIsShow(false)} href={'/sign'}>
              회원가입
            </Link>
            <div className={style.line}></div>
            <Link
              onClick={() => setMenuIsShow(false)}
              href={'/forgot/password'}
            >
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
