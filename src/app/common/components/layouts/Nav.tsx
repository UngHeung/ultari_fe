import React from 'react';
import Link from 'next/link';
import style from '../../styles/nav.module.css';

const Nav = () => {
  return (
    <nav className={style.mainNav}>
      <ul>
        <li>
          <Link href={'/'}>메인</Link>
        </li>
        <li>
          <Link href={'/auth'}>회원</Link>
        </li>
        <li>
          <Link href={'/post'}>게시판</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
