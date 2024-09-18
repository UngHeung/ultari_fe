import Image from 'next/image';

export type ImageFolderTypes = 'post' | 'profile';

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
  const imagePath = require(`@/public/${folder}/${path}`);

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
