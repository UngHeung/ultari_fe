import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { generateLogoImgOptions } from '../functions/generateLogoImgOptions';

export interface LogoOptions {
  type: 'basic' | 'small';
  id?: string;
  scale: number;
}

const Logo = (props: LogoOptions) => {
  const { src, className, width, height } = generateLogoImgOptions(
    props.type,
    props.scale,
  );

  return (
    <Link href={'/'}>
      <Image
        id={props.id}
        className={className}
        src={src}
        alt={'울타리_로고'}
        width={width}
        height={height}
        priority
      />
    </Link>
  );
};

export default Logo;
