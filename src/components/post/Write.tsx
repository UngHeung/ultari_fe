'use client';

import { authAxios } from '@/apis/axiosAuth';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../common/constants/pathConst';
import { setModal } from '../stores/reducer/modalRducer';
import PostButton from './elements/PostButton';
import PostInput from './elements/PostInput';
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

          const { status, success, message } = await handleUploadPost(event);

          dispatch(
            setModal({
              title: success ? '등록 성공' : '등록 실패',
              success: success,
              message: message,
              modalIsShow: true,
              type: success ? 'confirm' : 'alert',
              path: `/post/list`,
            }),
          );

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

export const handleUploadPost = async (event: FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);
  const title = formData.get('title');
  const content = formData.get('content');

  const data = { title, content };

  const url = `${BASE_URL}/${'post'}`;
  try {
    const response = await authAxios.post(url, data);

    console.log(response.data);

    return {
      data: response.data,
      status: response.status,
      success: true,
      message: '게시물 등록 성공',
    };
  } catch (error: any) {
    return {
      status: error.status,
      success: false,
      message: error.response.data.message,
    };
  }
};

export default Write;
