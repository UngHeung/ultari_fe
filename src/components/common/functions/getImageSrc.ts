import basicLogo from '@/public/images/logo_basic.png';
import smallLogo from '@/public/images/logo_small.png';

const getImageSrc = (type: 'basic' | 'small') => {
  return type === 'basic' ? basicLogo : smallLogo;
};

export default getImageSrc;
