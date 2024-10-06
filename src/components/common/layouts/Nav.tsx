import Link from 'next/link';
import { SetStateAction } from 'react';
import style from '../styles/nav.module.css';

const Nav = ({
  setIsShow,
}: {
  setIsShow: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <nav className={style.mainNav}>
      <ul className={style.mainNavUl}>
        <li>
          <Link onClick={() => setIsShow(false)} href={'/post/list'}>
            자유
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {
              setIsShow(false);
            }}
            href={'/team/create'}
          >
            팀생성
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {
              setIsShow(false);
            }}
            href={'/team/list'}
          >
            팀목록
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {
              setIsShow(false);
            }}
            href={'/user/my'}
          ></Link>
        </li>
        <li>
          <Link
            onClick={() => {
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
