import Image from 'next/image';
import Link from 'next/link';
import getImageSrc from '../functions/getImageSrc';
import style from '../styles/logo.module.css';
import { SetStateAction } from 'react';

export interface LogoOptions {
  id?: string;
  type: 'basic' | 'small';
  width?: string;
  height?: string;
  setIsShow: React.Dispatch<SetStateAction<boolean>>;
}

const Logo = ({ id, type, width, height, setIsShow }: LogoOptions) => {
  return (
    <Link
      onClick={() => setIsShow(false)}
      className={style.logoLink}
      href={'/'}
    >
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
