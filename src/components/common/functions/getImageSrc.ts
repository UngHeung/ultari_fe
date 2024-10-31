import {
  default as basicLogo,
  default as smallLogo,
} from '@/public/images/logo.png';

const getImageSrc = (type: 'basic' | 'small') => {
  return type === 'basic' ? basicLogo : smallLogo;
};

export default getImageSrc;
