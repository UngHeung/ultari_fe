import Link from 'next/link';
import React from 'react';

const Header = () => {
  return <nav>
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
  </nav>;
};

export default Header;
