'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../common/functions/showModal';
import { ModalState } from '../stores/reducer/modalRducer';
import PostButton from './elements/PostButton';
import PostInput from './elements/PostInput';
import { handleUploadPost } from './handlers/handleUploadPost';
import style from './styles/write.module.css';

const Write = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <>
      <form
        onSubmit={async event => {
          event.preventDefault();

          setDisabled(true);

          const { success, message } = await handleUploadPost(event);

          const modalData: ModalState = {
            title: success ? '게시물 등록 성공' : '게시물 등록 실패',
            success,
            message,
            modalIsShow: true,
            type: success ? 'confirm' : 'alert',
            path: success ? '/post/list' : '',
          };

          showModal(dispatch, modalData);
          setDisabled(false);
        }}
      >
        <section className={style.titleWrap}>
          <PostInput
            name={'title'}
            styleClass={style.title}
            type={'text'}
            placeholder={'제목'}
          />
        </section>
        <section className={style.contentWrap}>
          <textarea
            name={'content'}
            id=""
            className={style.content}
            placeholder={'내용'}
          />
        </section>
        <section className={style.buttonWrap}>
          <PostButton
            styleClass={`${style.button}`}
            type={'submit'}
            disabled={disabled}
            value={'등록'}
          />
          <PostButton
            styleClass={`${style.button}`}
            type={'button'}
            disabled={disabled}
            value={'취소'}
            onClick={() => router.back()}
          />
        </section>
      </form>
    </>
  );
};

export default Write;
