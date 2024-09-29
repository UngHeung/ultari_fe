import Link from 'next/link';
import style from '../styles/nav.module.css';

const Nav = () => {
  return (
    <nav className={style.mainNav}>
      <ul className={style.mainNavUl}>
        <li>
          <Link href={'/post/list'}>게시판</Link>
        </li>
        <li>
          <Link href={'/team/create'}>팀생성</Link>
        </li>
        <li>
          <Link href={'/team/list'}>팀목록</Link>
        </li>
        <li>
          <Link href={'/user/my'}></Link>
        </li>
        <li>
          <Link href={'/user/list'}>유저목록</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
