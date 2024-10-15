import Image from 'next/image';
import { useState } from 'react';
import { ImageFolderTypes } from './constants/commonConst';
import { postImagePath } from './constants/pathConst';

const ImageSlideItem = ({
  folder,
  path,
  width,
  height,
  styleClass,
}: {
  folder: ImageFolderTypes;
  path: string;
  width: number;
  height: number;
  styleClass: string;
}) => {
  const [isCover, setIsCover] = useState(false);

  function toggleImageFit(
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) {
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
        onError={error => console.log(error)}
        sizes={'100%'}
        style={{
          objectFit: isCover ? 'cover' : 'contain',
          objectPosition: '50% 50%',
        }}
        onClick={event => toggleImageFit(event)}
      />
    </>
  );
};

export default ImageSlideItem;
