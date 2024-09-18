import { MouseEventHandler, useEffect, useState } from 'react';
import ImageItem, { ImageFolderTypes } from './ImageSlideItem';
import style from './styles/imageSlider.module.css';

export type ImageTypes = 'postImage' | 'profileImage';

export interface ImageOptions {
  id: number;
  order: number;
  type: ImageTypes;
  path: string;
  createAt: Date;
  updateAt: Date;
}

const ImagesSlider = ({
  folder,
  images,
  width,
  height,
  styleModule,
}: {
  folder: ImageFolderTypes;
  images: ImageOptions[];
  width: number;
  height: number;
  styleModule: any;
}) => {
  const [imagePosition, setImagePosition] = useState<number>(0);
  const imageCount: number = images.length;
  const slideWidth: number = -(width * imageCount);

  useEffect(() => {
    if (imagePosition > 0) {
      setImagePosition(slideWidth + width);
    } else if (imagePosition < slideWidth + width) {
      setImagePosition(0);
    }
  }, [imagePosition]);

  return (
    <>
      <div className={`${styleModule?.imageSlider} ${style.imageSlider}`}>
        <ul
          className={`${styleModule?.imageList} ${style.imageList}`}
          style={{
            left: imagePosition,
            width: slideWidth,
          }}
        >
          {images.map(image => {
            const filename = image.path.split('/')[3];

            return (
              <li
                key={image.id}
                className={`${styleModule?.imageItem} ${style.image}`}
              >
                <ImageItem
                  path={filename}
                  folder={folder}
                  width={width}
                  height={height}
                  styleClass={styleModule?.image}
                />
              </li>
            );
          })}
        </ul>
        <section className={styleModule?.buttonWrap}>
          <button onClick={() => setImagePosition(imagePosition + width)}>
            {'<'}
          </button>
          <button onClick={() => setImagePosition(imagePosition - width)}>
            {'>'}
          </button>
        </section>
      </div>
    </>
  );
};

export default ImagesSlider;
