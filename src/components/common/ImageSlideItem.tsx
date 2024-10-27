import Image from 'next/image';
import { useState } from 'react';
import { postImagePath } from './constants/pathConst';

const ImageSlideItem = ({
  path,
  width,
  height,
  styleClass,
}: {
  path: string;
  width: number;
  height: number;
  styleClass: string;
}) => {
  const [isCover, setIsCover] = useState(false);

  function toggleImageFit() {
    setIsCover(prev => !prev);
  }

  return (
    <>
      <Image
        src={`${postImagePath}/${path}`}
        width={width}
        height={height}
        alt="슬라이드 이미지"
        className={styleClass}
        sizes={'100%'}
        style={{
          objectFit: isCover ? 'contain' : 'cover',
          objectPosition: '50% 50%',
        }}
        onClick={toggleImageFit}
      />
    </>
  );
};

export default ImageSlideItem;
