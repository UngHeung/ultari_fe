import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import PostButton from './elements/PostButton';
import { handleUploadImage } from './handlers/handleUploadImage';
import style from './styles/write.module.css';
import { ModalState } from '../stores/reducer/modalRducer';
import { showModal } from '../common/functions/showModal';
import { useDispatch } from 'react-redux';

const ImageUploadForm = ({
  setSelectedFilenames,
}: {
  setSelectedFilenames: Dispatch<SetStateAction<string[]>>;
}) => {
  const dispatch = useDispatch();
  const [uploadDisabled, setUploadDisabled] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<any>();

  return (
    <>
      <form
        onSubmit={async event => {
          event.preventDefault();

          setUploadDisabled(true);

          const { data, success, message } =
            await handleUploadImage(selectedFiles);

          console.log('imageupload : ', data);
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
        }}
      >
        <section className={style.imageWrap}>
          <section className={style.fileInputWrap}>
            <label htmlFor="imageUpload" className={style.selectButton}>
              +
            </label>
            <input
              type={'file'}
              name={'images'}
              id={'imageUpload'}
              accept={'image/png, image/jpeg, image/jpg, image/gif'}
              onChange={event => postFileHandler(event, setSelectedFiles)}
              style={{ display: 'none' }}
              multiple
            />
          </section>
          <section className={'previewWrap'}>
            <ul className={style.previewList}>
              <li className={style.previewItem}>
                <span className={style.preview}>
                  <Image
                    src="/post/d.png"
                    width={100}
                    height={100}
                    alt={'업로드 이미지 미리보기'}
                  />
                </span>
              </li>
            </ul>
          </section>
          <section className={'fileUploadButtonWrap'}>
            <PostButton
              styleClass={`${style.fileUploadButton}`}
              type={'submit'}
              disabled={uploadDisabled}
              value={'업로드'}
            />
          </section>
        </section>
      </form>
    </>
  );
};

function postFileHandler(
  event: ChangeEvent<HTMLInputElement>,
  setSelectedFiles: any,
) {
  event.preventDefault();
  setSelectedFiles(event.target.files);
}

export default ImageUploadForm;
