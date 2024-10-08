import Image from 'next/image';
import { ImageFolderTypes } from './constants/commonConst';

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
  const imagePath = `${process.env.NEXT_PUBLIC_DB_HOST}/public/${folder}/${path}`;

  return (
    <>
      <Image
        src={imagePath}
        width={width}
        height={height}
        alt="슬라이드 이미지"
        className={styleClass}
        onError={error => console.log(error)}
      />
    </>
  );
};

export default ImageSlideItem;
