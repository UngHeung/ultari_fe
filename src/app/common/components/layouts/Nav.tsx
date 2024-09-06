import React from 'react';
import Logo from './Logo';
import Link from 'next/link';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href={'/'}>home</Link>
        </li>
        <li>
          <Link href={'/auth'}>auth</Link>
        </li>
        <li>
          <Link href={'/post'}>post</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
