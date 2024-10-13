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
  return (
    <>
      <Image
        src={`${process.env.NEXT_PUBLIC_BUCKET_HOST}/${process.env.NEXT_PUBLIC_BUCKET_NAME}/public/images/post/${path}`}
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
