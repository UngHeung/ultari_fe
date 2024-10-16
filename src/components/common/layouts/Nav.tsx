import Link from 'next/link';
import { SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import userAuthentication from '../functions/userAuthentication';
import style from '../styles/nav.module.css';

const Nav = ({
  setIsShow,
  isLoggedIn,
}: {
  setIsShow: React.Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
}) => {
  const dispatch = useDispatch();

  return (
    <nav className={style.mainNav}>
      <ul className={style.mainNavUl}>
        <li>
          <Link
            onClick={event => {
              setIsShow(false);
            }}
            href={'/post/list'}
          >
            자유
          </Link>
        </li>
        <li>
          <Link
            onClick={event => {
              userAuthentication(isLoggedIn, dispatch, event);
              setIsShow(false);
            }}
            href={'/team/create'}
          >
            팀생성
          </Link>
        </li>
        <li>
          <Link
            onClick={event => {
              userAuthentication(isLoggedIn, dispatch, event);
              setIsShow(false);
            }}
            href={'/team/list'}
          >
            팀목록
          </Link>
        </li>
        <li>
          <Link
            onClick={event => {
              userAuthentication(isLoggedIn, dispatch, event);
              setIsShow(false);
            }}
            href={'/user/list'}
          >
            유저목록
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
