import basicLogo from '@/public/images/logo_basic.png';
import smallLogo from '@/public/images/logo_small.png';

export const generateLogoImgOptions = (type: 'basic' | 'small') => {
  return {
    src: type === 'basic' ? basicLogo : smallLogo,
    className: type === 'basic' ? 'basicLogo' : 'smallLogo',
    width: type === 'basic' ? 250 : 150,
    height: 150,
  };
};
