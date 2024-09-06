import basicLogo from '@/public/images/logo_basic.png';
import smallLogo from '@/public/images/logo_small.png';
import style from '../styles/logo.module.css';

export const generateLogoImgOptions = (
  type: 'basic' | 'small',
  scale: number,
) => {
  return {
    src: type === 'basic' ? basicLogo : smallLogo,
    className: type === 'basic' ? style.basicLogo : style.smallLogo,
    width: type === 'basic' ? 250 * (scale / 100) : 150 * (scale / 100),
    height: 150 * (scale / 100),
  };
};
