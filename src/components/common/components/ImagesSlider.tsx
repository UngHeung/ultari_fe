'use client';

import { useState } from 'react';
import { ImageFolderTypes } from '../constants/commonConst';
import { ImageOptions } from '../interfaces/commonInterface';
import ImageItem from './ImageSlideItem';
import style from './styles/imageSlider.module.css';

const ImagesSlider = ({
  images,
}: {
  folder: ImageFolderTypes;
  images: ImageOptions[];
}) => {
  const imageCount = images?.length;
  const initialWidth = window.innerWidth;

  const [width, setWidth] = useState<number>(
    initialWidth > 600 ? 600 : initialWidth,
  );
  const [imagePosition, setImagePosition] = useState<number>(0);
  const [slideWidth, setSlideWidth] = useState<number>(width * imageCount);
  const [index, setIndex] = useState<number>(0);

  function imageSliderProcess(type: 'moveRight' | 'moveLeft') {
    initialVariable();

    if (type === 'moveRight') {
      if (index + 1 > imageCount - 1) {
        setIndex(0);
        setImagePosition(0);
      } else {
        setIndex(prev => prev + 1);
        setImagePosition(prev => prev - width);
      }
    } else {
      if (index - 1 < 0) {
        setIndex(imageCount - 1);
        setImagePosition(width * (imageCount - 1) * -1);
      } else {
        setIndex(prev => prev - 1);
        setImagePosition(prev => prev + width);
      }
    }
  }

  function initialVariable() {
    const initialWidth = window.innerWidth;
    const imageWidth = initialWidth > 600 ? 600 : initialWidth;

    if (width === imageWidth) return;

    const allImagesWidth = imageWidth * imageCount;

    setWidth(imageWidth);
    setSlideWidth(allImagesWidth);
    setImagePosition(-(imageWidth * index));
  }

  return (
    <>
      <div className={style.imageSlider}>
        <ul
          className={style.imageList}
          style={{
            left: imagePosition,
            width: slideWidth,
            height: (width / 6) * 4,
          }}
        >
          {images?.map((image, idx) => {
            const filename = image.path.split('/')[3];

            return (
              <li key={idx} className={`${style.imageItem}`}>
                <ImageItem
                  path={filename}
                  width={width}
                  height={(width / 6) * 4}
                  styleClass={style.image}
                />
              </li>
            );
          })}
        </ul>
        {images.length > 1 && (
          <>
            <button onClick={() => imageSliderProcess('moveLeft')}></button>
            <button onClick={() => imageSliderProcess('moveRight')}></button>
          </>
        )}
      </div>
    </>
  );
};

export default ImagesSlider;
