'use client';

import { useEffect, useState } from 'react';
import { ImageFolderTypes } from './constants/commonConst';
import ImageItem from './ImageSlideItem';
import { ImageOptions } from './interfaces/commonInterface';
import style from './styles/imageSlider.module.css';

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
  const imageCount: number = images?.length;
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
          {images?.map(image => {
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
