import { setModal } from '@/components/stores/reducer/modalRducer';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModalState } from '../../stores/interfaces/stateInterface';
import ImageInput from '../elements/ImageInput';
import SelectedImageConfirmButton from '../elements/SelectedImageConfirmButton';
import handleImageBlob from '../handlers/handleImageBlob';
import handleUploadImage from '../handlers/handleUploadImage';
import style from '../styles/write.module.css';
import ImageBlobList from './ImageBlobList';

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

    if (!confirmedImages) return;

    setUploadDisabled(true);

    const { success, message, data } = await handleUploadImage(selectedFiles!);

    setSelectedFilenames(data?.fileNames);

    const modalData: ModalState = {
      title: '이미지 업로드',
      success,
      message,
      modalIsShow: true,
      type: success ? 'confirm' : 'alert',
      routerType: 'replace',
    };

    dispatch(setModal(modalData));
    setUploadDisabled(false);
  }

  return (
    <>
      <form onSubmit={imageUploadProcess} className={style.imageUploadForm}>
        <section className={style.imageWrap}>
          <section className={style.fileInputWrap}>
            <ImageInput
              useLabel={true}
              isMultiple={true}
              labelStyleClass={style.selectButton}
              labelValue={addImageIcon}
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
            <SelectedImageConfirmButton
              type={'submit'}
              onClick={() => setConfirmedImages(prev => !prev)}
              confirmedImages={confirmedImages}
              disabled={uploadDisabled}
            />
            <div
              style={{
                display:
                  !selectedFiles || selectedFiles?.length <= 0
                    ? 'inline-block'
                    : 'none',
              }}
              className={style.descWrap}
            >
              <p className={style.description}>
                <span>{'이 곳을 눌러 업로드할 이미지를 선택해주세요.'}</span>
                <span>{'확장자 - JPG / JPEG / PNG / GIF / WEBP.'}</span>
              </p>
              <p className={style.description}>
                <span>{'이미지 업로드는 최대 3개까지 가능하며.'}</span>
                <span>{'업로드 가능한 용량은 최대 2Mb 입니다.'}</span>
              </p>
            </div>

            <p
              className={`${style.description} ${style.last}`}
              style={{
                top: !selectedFiles || selectedFiles?.length <= 0 ? 0 : 10,
              }}
            >
              <span>{'글을 저장하기 전'}</span>
              <strong className={style.uploadMini}>{uploadIconForDesc}</strong>
              <span>{'버튼을 눌러'}</span>
              <strong className={style.warnMini}>{warnIcon}</strong>
              <span>{'선택한 이미지들을 먼저 업로드해주세요.'}</span>
            </p>
          </section>
        </section>
      </form>
    </>
  );
};

export default ImageUploadForm;

const addImageIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 5C21.1 5 22 5.9 22 7V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V7C2 5.9 2.9 5 4 5H7.17L9 3H15L16.83 5H20ZM20 19V7H4V19H20ZM14 12L11 15.72L9 13L6 17H18L14 12Z"
      fill="#767676"
    />
  </svg>
);

const uploadIconForDesc = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.9999 9.50249C6.80157 9.50249 6.63544 9.43529 6.5015 9.30089C6.3671 9.16696 6.2999 9.00083 6.2999 8.80249V3.79749L4.9874 5.10999C4.8474 5.24999 4.68407 5.31999 4.4974 5.31999C4.31074 5.31999 4.14157 5.24416 3.9899 5.09249C3.8499 4.95249 3.78294 4.78613 3.789 4.59339C3.7946 4.40113 3.86157 4.24083 3.9899 4.11249L6.5099 1.59249C6.5799 1.52249 6.65574 1.47279 6.7374 1.44339C6.81907 1.41446 6.90657 1.39999 6.9999 1.39999C7.09324 1.39999 7.18074 1.41446 7.2624 1.44339C7.34407 1.47279 7.4199 1.52249 7.4899 1.59249L10.0099 4.11249C10.1499 4.25249 10.2169 4.41863 10.2108 4.61089C10.2052 4.80363 10.1382 4.96416 10.0099 5.09249C9.8699 5.23249 9.70377 5.30529 9.5115 5.31089C9.31877 5.31696 9.1524 5.24999 9.0124 5.10999L7.6999 3.79749V8.80249C7.6999 9.00083 7.63294 9.16696 7.499 9.30089C7.3646 9.43529 7.19824 9.50249 6.9999 9.50249ZM2.7999 12.3025C2.4149 12.3025 2.08544 12.1655 1.8115 11.8916C1.5371 11.6172 1.3999 11.2875 1.3999 10.9025V9.50249C1.3999 9.30416 1.46687 9.13779 1.6008 9.00339C1.7352 8.86946 1.90157 8.80249 2.0999 8.80249C2.29824 8.80249 2.4646 8.86946 2.599 9.00339C2.73294 9.13779 2.7999 9.30416 2.7999 9.50249V10.9025H11.1999V9.50249C11.1999 9.30416 11.2671 9.13779 11.4015 9.00339C11.5354 8.86946 11.7016 8.80249 11.8999 8.80249C12.0982 8.80249 12.2644 8.86946 12.3983 9.00339C12.5327 9.13779 12.5999 9.30416 12.5999 9.50249V10.9025C12.5999 11.2875 12.4629 11.6172 12.189 11.8916C11.9146 12.1655 11.5849 12.3025 11.1999 12.3025H2.7999Z"
      fill="#2D8738"
    />
  </svg>
);

const warnIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_6_1344)">
      <path
        d="M6.41675 8.74999H7.58341V9.91666H6.41675V8.74999ZM6.41675 4.08332H7.58341V7.58332H6.41675V4.08332ZM6.99425 1.16666C3.77425 1.16666 1.16675 3.77999 1.16675 6.99999C1.16675 10.22 3.77425 12.8333 6.99425 12.8333C10.2201 12.8333 12.8334 10.22 12.8334 6.99999C12.8334 3.77999 10.2201 1.16666 6.99425 1.16666ZM7.00008 11.6667C4.42175 11.6667 2.33341 9.57832 2.33341 6.99999C2.33341 4.42166 4.42175 2.33332 7.00008 2.33332C9.57841 2.33332 11.6667 4.42166 11.6667 6.99999C11.6667 9.57832 9.57841 11.6667 7.00008 11.6667Z"
        fill="#C80E0E"
      />
    </g>
    <defs>
      <clipPath id="clip0_6_1344">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
