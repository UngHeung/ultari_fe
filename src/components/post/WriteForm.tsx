import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import showModal from '../common/functions/showModal';
import { ModalState, SliceOptions } from '../stores/interfaces/stateInterface';
import { setPost } from '../stores/reducer/postReducer';
import PostButton from './elements/PostButton';
import PostInput from './elements/PostInput';
import handleUploadPost from './handlers/handleUploadPost';
import { PostWriteTypes } from './interfaces/postInterfaces';
import style from './styles/write.module.css';

const WriteForm = ({
  type,
  selectedFilenames,
}: {
  type: PostWriteTypes;
  selectedFilenames: string[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const updatePostId = type === 'update' && pathname.split('/')[3];
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useDispatch();
  const post =
    type === 'update' ? useSelector((state: SliceOptions) => state.post) : null;
  const user = useSelector((state: SliceOptions) => state.user);

  return (
    <>
      <form
        onSubmit={async event => {
          event.preventDefault();

          setDisabled(true);

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

export default WriteForm;