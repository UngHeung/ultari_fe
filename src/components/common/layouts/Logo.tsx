import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import style from '../styles/logo.module.css';
import { getImageSrc } from '../functions/getImageSrc';

export interface LogoOptions {
  id?: string;
  type: 'basic' | 'small';
}

const Logo = ({ id, type }: LogoOptions) => {
  return (
    <Link href={'/'}>
      <Image
        id={id}
        className={style.logoImage}
        src={getImageSrc(type)}
        alt={'울타리_로고 메인으로 이동'}
        placeholder="blur"
        priority
      />
    </Link>
  );
};

export default Logo;
