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
}: {
  folder: ImageFolderTypes;
  images: ImageOptions[];
  width: number;
  height: number;
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
      <div className={style.imageSlider}>
        <ul
          className={style.imageList}
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
                className={`${style.imageItem} ${style.image}`}
              >
                <ImageItem
                  path={filename}
                  folder={folder}
                  width={width}
                  height={height}
                  styleClass={style.image}
                />
              </li>
            );
          })}
        </ul>
        {images.length > 1 && (
          <>
            {/* <section className={style.buttonWrap}> */}
            <button
              onClick={() => setImagePosition(imagePosition + width)}
            ></button>
            <button
              onClick={() => setImagePosition(imagePosition - width)}
            ></button>
            {/* </section> */}
          </>
        )}
      </div>
    </>
  );
};

export default ImagesSlider;
