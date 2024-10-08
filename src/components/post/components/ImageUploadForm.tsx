import { ChangeEvent, FormEvent, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import showModal from '../../common/functions/showModal';
import { ModalState } from '../../stores/interfaces/stateInterface';
import ImageInput from '../elements/ImageInput';
import SelectedImageConfirmButton from '../elements/SelectedImageConfirmButton';
import handleUploadImage from '../handlers/handleUploadImage';
import ImageBlobList from './ImageBlobList';
import style from './styles/write.module.css';
import handleImageBlob from '../handlers/handleImageBlob';

const ImageUploadForm = ({
  setSelectedFilenames,
}: {
  setSelectedFilenames: React.Dispatch<string[]>;
}) => {
  const dispatch = useDispatch();

  const [uploadDisabled, setUploadDisabled] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>();
  const [selectedImageBlobs, setSelectedImageBlobs] = useState<string[]>([]);
  const [confirmedImages, setConfirmedImages] = useState<boolean>(false);

  async function imageUploadProcess(event: FormEvent) {
    event.preventDefault();

    setUploadDisabled(true);

    const { success, message, data } = await handleUploadImage(selectedFiles!);

    setSelectedFilenames(data.fileNames);

    const modalData: ModalState = {
      title: '이미지 업로드',
      success,
      message,
      modalIsShow: true,
      type: success ? 'confirm' : 'alert',
      routerType: 'replace',
    };

    showModal(dispatch, modalData);

    setUploadDisabled(false);
  }

  return (
    <>
      <form onSubmit={imageUploadProcess}>
        <section className={style.imageWrap}>
          <section className={style.fileInputWrap}>
            <ImageInput
              useLabel={true}
              isMultiple={true}
              labelStyleClass={style.selectButton}
              labelValue={addImageButtonIcon}
              name={'images'}
              id={'imageUpload'}
              accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
              onChange={event =>
                handleImageBlob(
                  event,
                  selectedFiles!,
                  setSelectedFiles,
                  setSelectedImageBlobs,
                )
              }
              disabeld={confirmedImages}
            />
          </section>
          <ImageBlobList
            selectedImageBlobs={selectedImageBlobs}
            setSelectedImageBlobs={setSelectedImageBlobs}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            readOnly={confirmedImages}
          />
          <section className={'fileUploadButtonWrap'}></section>
          <section>
            {selectedFiles && selectedFiles.length > 0 ? (
              <SelectedImageConfirmButton
                type={'submit'}
                onClick={() => setConfirmedImages(prev => !prev)}
                confirmedImages={confirmedImages}
                disabled={uploadDisabled}
              />
            ) : (
              <p className={style.descriptionImageUpload}>
                {'⬅︎ 이미지를 추가하려면 여기를 눌러주세요.'}
              </p>
            )}
          </section>
        </section>
      </form>
    </>
  );
};

export default ImageUploadForm;

export const addImageButtonIcon = (
  <svg
    width="20"
    height="18"
    viewBox="0 0 20 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5 2.125C17.8438 2.125 18.125 2.40625 18.125 2.75V15.2422L17.9297 14.9883L12.6172 8.11328C12.4414 7.88281 12.1641 7.75 11.875 7.75C11.5859 7.75 11.3125 7.88281 11.1328 8.11328L7.89062 12.3086L6.69922 10.6406C6.52344 10.3945 6.24219 10.25 5.9375 10.25C5.63281 10.25 5.35156 10.3945 5.17578 10.6445L2.05078 15.0195L1.875 15.2617V15.25V2.75C1.875 2.40625 2.15625 2.125 2.5 2.125H17.5ZM2.5 0.25C1.12109 0.25 0 1.37109 0 2.75V15.25C0 16.6289 1.12109 17.75 2.5 17.75H17.5C18.8789 17.75 20 16.6289 20 15.25V2.75C20 1.37109 18.8789 0.25 17.5 0.25H2.5ZM5.625 7.75C5.87123 7.75 6.11505 7.7015 6.34253 7.60727C6.57002 7.51305 6.77672 7.37494 6.95083 7.20083C7.12494 7.02672 7.26305 6.82002 7.35727 6.59253C7.4515 6.36505 7.5 6.12123 7.5 5.875C7.5 5.62877 7.4515 5.38495 7.35727 5.15747C7.26305 4.92998 7.12494 4.72328 6.95083 4.54917C6.77672 4.37506 6.57002 4.23695 6.34253 4.14273C6.11505 4.0485 5.87123 4 5.625 4C5.37877 4 5.13495 4.0485 4.90747 4.14273C4.67998 4.23695 4.47328 4.37506 4.29917 4.54917C4.12506 4.72328 3.98695 4.92998 3.89273 5.15747C3.7985 5.38495 3.75 5.62877 3.75 5.875C3.75 6.12123 3.7985 6.36505 3.89273 6.59253C3.98695 6.82002 4.12506 7.02672 4.29917 7.20083C4.47328 7.37494 4.67998 7.51305 4.90747 7.60727C5.13495 7.7015 5.37877 7.75 5.625 7.75Z"
      fill="var(--color-placeholder)"
    />
  </svg>
);
