import ImageBlobItem from './ImageBlobItem';
import style from './styles/uploadImage.module.css';

const ImageBlobList = ({
  selectedImageBlobs,
  setSelectedImageBlobs,
  selectedFiles,
  setSelectedFiles,
}: {
  selectedImageBlobs: string[];
  setSelectedImageBlobs: React.Dispatch<string[]>;
  selectedFiles: File[] | undefined;
  setSelectedFiles: React.Dispatch<File[]>;
}) => {
  return (
    <section className={style.previewImageWrap}>
      <ul className={style.previewImageList}>
        {selectedImageBlobs &&
          selectedImageBlobs.map((image, idx) => {
            return (
              <ImageBlobItem
                key={idx}
                image={image}
                idx={idx}
                className={style.previewImage}
                selectedImageBlobs={selectedImageBlobs}
                setSelectedImageBlobs={setSelectedImageBlobs}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
              />
            );
          })}
      </ul>
    </section>
  );
};

export default ImageBlobList;
