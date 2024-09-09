import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import style from '../styles/logo.module.css';
import { getImageSrc } from '../functions/getImageSrc';

export interface LogoOptions {
  id?: string;
  type: 'basic' | 'small';
  width?: string;
  height?: string;
}

const Logo = ({ id, type, width, height }: LogoOptions) => {
  return (
    <Link className={style.logoLink} href={'/'}>
      <Image
        id={id}
        className={style.logoImage}
        src={getImageSrc(type)}
        alt={'울타리_로고 메인으로 이동'}
        placeholder="blur"
        style={{
          width: width ?? 'auto',
          height: height ?? 'auto',
        }}
        priority
      />
    </Link>
  );
};

export default Logo;
