import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect from '../../common/CustomSelect';
import showModal from '../../common/functions/showModal';
import {
  ModalState,
  SliceOptions,
} from '../../stores/interfaces/stateInterface';
import { setPost } from '../../stores/reducer/postReducer';
import PostButton from '../elements/PostButton';
import PostInput from '../elements/PostInput';
import handleUploadPost from '../handlers/handleUploadPost';
import { PostWriteTypes } from '../interfaces/postInterfaces';
import style from './styles/write.module.css';
import ImageUploadForm from './ImageUploadForm';

const PostWriteForm = ({ type }: { type: PostWriteTypes }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const updatePostId = type === 'update' && pathname.split('/')[3];

  const [selectedFilenames, setSelectedFilenames] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const post = useSelector((state: SliceOptions) => state.post);
  const user = useSelector((state: SliceOptions) => state.user);

  async function postWriteProcess(event: FormEvent<HTMLFormElement>) {
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
  }

  return (
    <>
      <ImageUploadForm setSelectedFilenames={setSelectedFilenames} />
      <form onSubmit={postWriteProcess}>
        <section className={style.titleWrap}>
          <PostInput
            name={'title'}
            styleClass={style.title}
            type={'text'}
            placeholder={'제목'}
            value={type === 'update' ? post?.title : ''}
          />
          <CustomSelect
            selectOptions={[
              { option: '자유', data: 'TYPE_FREE' },
              { option: '감사제목', data: 'TYPE_THANKS' },
              { option: '기도제목', data: 'TYPE_PRAYER' },
              { option: '나눔', data: 'TYPE_SHARE' },
            ]}
            selectId={'postContentTypeSelect'}
            name={'contentType'}
            styleClass={style.selectType}
          />
          <CustomSelect
            selectOptions={[
              { option: '전체공개', data: 'SCOPE_PUBLIC' },
              { option: '목장공개', data: 'SCOPE_TEAM' },
              { option: '비공개', data: 'SCOPE_PERSONAL' },
            ]}
            selectId={'postVisibilitySelect'}
            name={'visibility'}
            styleClass={style.selectVisibility}
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

export default PostWriteForm;
