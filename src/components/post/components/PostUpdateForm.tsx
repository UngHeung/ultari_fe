import CustomSelect from '@/components/common/elements/CustomSelect';
import handleUploadPost from '@/components/post/handlers/handleUploadPost';
import {
  ModalState,
  SliceOptions,
} from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import { setPost } from '@/components/stores/reducer/postReducer';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostButton from '../elements/PostButton';
import PostInput from '../elements/PostInput';
import {
  ContentTypeOptions,
  VisibilityOptions,
} from '../interfaces/postInterfaces';
import style from '../styles/write.module.css';

export interface ContentTypeSelectOptions {
  option: string;
  data: ContentTypeOptions;
}
export interface VisibilitySelectOptions {
  option: string;
  data: VisibilityOptions;
}

const UpdatePostForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const updatePostId = pathname.split('/')[3];

  const [selectedFilenames, setSelectedFilenames] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.logged.isLoggedIn,
  );

  const post = useSelector((state: SliceOptions) => state.post);
  const user = useSelector((state: SliceOptions) => state.user);

  const contentTypeSelectOptions: ContentTypeSelectOptions[] = [
    { option: '자유', data: 'TYPE_FREE' },
    { option: '감사제목', data: 'TYPE_THANKS' },
    { option: '기도제목', data: 'TYPE_PRAYER' },
    { option: '나눔', data: 'TYPE_SHARE' },
  ];

  const visibleTypeSelectOptions: VisibilitySelectOptions[] = [
    { option: '전체공개', data: 'SCOPE_PUBLIC' },
    { option: '목장공개', data: 'SCOPE_TEAM' },
    { option: '비공개', data: 'SCOPE_PERSONAL' },
  ];

  useEffect(() => {
    if (isLoggedIn && post.author.id !== user.id) {
      router.replace(`/post/detail/${post.id}`);
    }
  }, []);

  async function postWriteProcess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setDisabled(true);

    const { data, success, message } = await handleUploadPost(
      event,
      'update',
      selectedFilenames,
      +updatePostId,
    );

    dispatch(setPost({ ...data, author: user }));

    const modalData: ModalState = {
      title: success ? '게시물 수정 성공' : '게시물 수정 실패',
      success,
      message,
      modalIsShow: true,
      type: success ? 'confirm' : 'alert',
      routerType: 'replace',
      leftPath: success ? `/post/detail/${updatePostId}` : '',
    };

    dispatch(setModal(modalData));
    setDisabled(false);
  }
  return (
    <>
      {/* <ImageUploadForm setSelectedFilenames={setSelectedFilenames} /> */}
      <form onSubmit={postWriteProcess}>
        <section className={style.titleWrap}>
          <PostInput
            name={'title'}
            styleClass={style.title}
            type={'text'}
            placeholder={'제목'}
            value={post.title}
          />
          <CustomSelect
            selectOptions={contentTypeSelectOptions}
            selectId={'postContentTypeSelect'}
            name={'contentType'}
            styleClass={style.selectType}
            defaultSelect={contentTypeSelectOptions.findIndex(
              option => option.data === post.contentType,
            )}
          />
          <CustomSelect
            selectOptions={visibleTypeSelectOptions}
            selectId={'postVisibilitySelect'}
            name={'visibility'}
            styleClass={style.selectVisibility}
            defaultSelect={visibleTypeSelectOptions.findIndex(
              option => option.data === post.visibility,
            )}
          />
        </section>
        <section className={style.contentWrap}>
          <textarea
            name={'content'}
            id={''}
            className={style.content}
            placeholder={'내용'}
            defaultValue={post.content}
          />
        </section>
        <section className={style.buttonWrap}>
          <PostButton
            styleClass={`${style.button}`}
            type={'submit'}
            disabled={disabled}
            value={'수정'}
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

export default UpdatePostForm;
