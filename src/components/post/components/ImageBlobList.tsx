import ImageBlobItem from './ImageBlobItem';
import style from './styles/uploadImage.module.css';

const ImageBlobList = ({
  selectedImageBlobs,
  setSelectedImageBlobs,
  selectedFiles,
  setSelectedFiles,
  readOnly,
}: {
  selectedImageBlobs: string[];
  setSelectedImageBlobs: React.Dispatch<string[]>;
  selectedFiles: File[] | undefined;
  setSelectedFiles: React.Dispatch<File[]>;
  readOnly: boolean;
}) => {
  return (
    <section className={style.previewImageWrap}>
      <ul
        className={`${style.previewImageList} ${readOnly ? style.readOnly : ''}`}
      >
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
                readOnly={readOnly}
              />
            );
          })}
      </ul>
    </section>
  );
};

export default ImageBlobList;
