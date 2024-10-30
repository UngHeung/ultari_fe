import CustomSelect from '@/components/common/elements/CustomSelect';
import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import useLoggedStore, {
  LoggedStore,
} from '@/components/stores/user/loggedStore';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ModalState,
  SliceOptions,
} from '../../stores/interfaces/stateInterface';
import { setPost } from '../../stores/reducer/postReducer';
import PostButton from '../elements/PostButton';
import PostInput from '../elements/PostInput';
import handleUploadPost from '../handlers/handleUploadPost';
import {
  ContentTypeOptions,
  VisibilityOptions,
} from '../interfaces/postInterfaces';
import style from '../styles/write.module.css';
import ImageUploadForm from './ImageUploadForm';

export interface ContentTypeSelectOptions {
  option: string;
  data: ContentTypeOptions;
}
export interface VisibilitySelectOptions {
  option: string;
  data: VisibilityOptions;
}

export const contentTypeSelectOptions: ContentTypeSelectOptions[] = [
  { option: '자유', data: 'TYPE_FREE' },
  { option: '감사제목', data: 'TYPE_THANKS' },
  { option: '기도제목', data: 'TYPE_PRAYER' },
  { option: '나눔', data: 'TYPE_SHARE' },
];

export const visibleTypeSelectOptions: VisibilitySelectOptions[] = [
  { option: '전체공개', data: 'SCOPE_PUBLIC' },
  { option: '목장공개', data: 'SCOPE_TEAM' },
  { option: '비공개', data: 'SCOPE_PERSONAL' },
];

const PostWriteForm = ({ type }: { type: 'new' | 'update' }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const updatePostId = pathname.split('/')[3];

  const [selectedFilenames, setSelectedFilenames] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);
  const setModal = useModalStore((state: ModalStore) => state.setModal);

  const post = useSelector((state: SliceOptions) => state.post);
  const user = useSelector((state: SliceOptions) => state.user);

  useEffect(() => {
    if (type === 'update') {
      if (isLoggedIn && post.author.id !== user.id) {
        router.replace(`/post/detail/${post.id}`);
      }
    }
  }, []);

  async function postWriteProcess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setDisabled(true);

    const { data, success, message } = await handleUploadPost(
      event,
      type,
      selectedFilenames,
      type === 'update' ? +updatePostId : undefined,
    );

    dispatch(setPost({ ...data, author: user }));

    const postId = data?.id;

    const modalData: ModalState = {
      title: success ? '게시물 등록 성공' : '게시물 등록 실패',
      success,
      message,
      modalIsShow: true,
      type: success ? 'confirm' : 'alert',
      routerType: 'replace',
      leftPath: success ? `/post/detail/${postId}` : '',
    };

    setModal(modalData);
    setDisabled(false);
  }

  return (
    <>
      <ImageUploadForm setSelectedFilenames={setSelectedFilenames} />
      <form onSubmit={postWriteProcess} className={style.writeForm}>
        <section className={style.titleWrap}>
          <PostInput
            name={'title'}
            styleClass={style.title}
            type={'text'}
            placeholder={'제목을 입력해주세요.'}
            value={type === 'update' ? post.title : ''}
          />

          <div className={style.innerNavWrap}>
            <section className={style.selectWrap}>
              <CustomSelect
                selectOptions={contentTypeSelectOptions}
                selectId={'postContentTypeSelect'}
                name={'contentType'}
                styleClass={style.selectType}
                defaultSelect={
                  type === 'update'
                    ? contentTypeSelectOptions.findIndex(
                        item => item.data === post.contentType,
                      )
                    : 0
                }
              />
              <CustomSelect
                selectOptions={visibleTypeSelectOptions}
                selectId={'postVisibilitySelect'}
                name={'visibility'}
                styleClass={style.selectVisibility}
                defaultSelect={
                  type === 'update'
                    ? visibleTypeSelectOptions.findIndex(
                        item => item.data === post.visibility,
                      )
                    : 0
                }
              />
            </section>
          </div>
        </section>
        <section className={style.contentWrap}>
          <textarea
            name={'content'}
            id=""
            className={style.content}
            placeholder={'내용을 입력해주세요.'}
            defaultValue={type === 'update' ? post.content : ''}
          />
        </section>
        <section className={style.buttonWrap}>
          <div className={style.buttonBg}>
            <PostButton
              styleClass={style.button}
              type={'submit'}
              disabled={disabled}
              value={saveIcon}
            />
          </div>
        </section>
      </form>
    </>
  );
};

export default PostWriteForm;

export const saveIcon = (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_6_578)">
      <path
        d="M28.3333 5H8.33333C6.48333 5 5 6.5 5 8.33333V31.6667C5 33.5 6.48333 35 8.33333 35H31.6667C33.5 35 35 33.5 35 31.6667V11.6667L28.3333 5ZM20 31.6667C17.2333 31.6667 15 29.4333 15 26.6667C15 23.9 17.2333 21.6667 20 21.6667C22.7667 21.6667 25 23.9 25 26.6667C25 29.4333 22.7667 31.6667 20 31.6667ZM25 15H8.33333V8.33333H25V15Z"
        fill="#767676"
      />
    </g>
    <defs>
      <clipPath id="clip0_6_578">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
