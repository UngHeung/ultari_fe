'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../common/functions/showModal';
import { SliceOptions } from '../stores/constants/stateOptions';
import { ModalState } from '../stores/reducer/modalRducer';
import { setPost } from '../stores/reducer/postReducer';
import PostButton from './elements/PostButton';
import PostInput from './elements/PostInput';
import { handleUploadPost } from './handlers/handleUploadPost';
import ImageUploadForm from './ImageUploadForm';
import style from './styles/write.module.css';

export type PostWriteTypes = 'new' | 'update';

const Write = ({ type }: { type: PostWriteTypes }) => {
  const router = useRouter();
  const pathname = usePathname();
  const updatePostId = type === 'update' && pathname.split('/')[3];
  const [disabled, setDisabled] = useState<boolean>(false);
  const [selectedFilenames, setSelectedFilenames] = useState<string[]>([]);
  const dispatch = useDispatch();
  const post =
    type === 'update' ? useSelector((state: SliceOptions) => state.post) : null;
  const user = useSelector((state: SliceOptions) => state.user);

  return (
    <>
      <ImageUploadForm setSelectedFilenames={setSelectedFilenames} />
      <form
        onSubmit={async event => {
          event.preventDefault();

          setDisabled(true);

          console.log(selectedFilenames);

          const { data, success, message } = await handleUploadPost(
            event,
            type,
            selectedFilenames,
            +updatePostId,
          );

          dispatch(setPost({ ...data, author: user }));

          const postId = data?.id;

          const modalData: ModalState = {
            title: success
              ? `게시물 ${type === 'new' ? '등록' : '수정'} 성공`
              : `게시물 ${type === 'new' ? '등록' : '수정'} 실패`,
            success,
            message,
            modalIsShow: true,
            type: success ? 'confirm' : 'alert',
            routerType: 'replace',
            leftPath: success
              ? type === 'new'
                ? `/post/${postId}`
                : `/post/${updatePostId}`
              : '',
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
            value={type === 'update' ? post?.title : ''}
          />
        </section>
        <section className={style.contentWrap}>
          <textarea
            name={'content'}
            id=""
            className={style.content}
            placeholder={'내용'}
            defaultValue={type === 'update' ? post?.content : ''}
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
            onClick={() => {
              if (type === 'update') {
                dispatch(setPost(post));
              }
              router.back();
            }}
          />
        </section>
      </form>
    </>
  );
};

export default Write;
