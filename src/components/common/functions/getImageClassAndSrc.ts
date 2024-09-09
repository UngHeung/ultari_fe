import basicLogo from '@/public/images/logo_basic.png';
import smallLogo from '@/public/images/logo_small.png';
import style from '../styles/logo.module.css';

export const getImageClassAndSrc = (type: 'basic' | 'small') => {
  return {
    className: type === 'basic' ? style.basicLogo : style.smallLogo,
    src: type === 'basic' ? basicLogo : smallLogo,
  };
};
