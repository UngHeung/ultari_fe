import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getImageClassAndSrc } from '../functions/generateLogoImgOptions';

export interface LogoOptions {
  id?: string;
  type: 'basic' | 'small';
}

const Logo = ({ id, type }: LogoOptions) => {
  const { className, src } = getImageClassAndSrc(type);

  return (
    <Link href={'/'}>
      <Image
        id={id}
        className={className}
        src={src}
        alt={'울타리_로고 메인으로 이동'}
        layout="responsive"
        placeholder="blur"
        priority
      />
    </Link>
  );
};

export default Logo;
