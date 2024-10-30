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
import style from '../styles/write.module.css';
import {
  contentTypeSelectOptions,
  saveIcon,
  visibleTypeSelectOptions,
} from './PostWriteForm';

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
      <form onSubmit={postWriteProcess} className={style.writeForm}>
        <section className={style.titleWrap}>
          <PostInput
            name={'title'}
            styleClass={style.title}
            type={'text'}
            placeholder={'수정할 제목을 입력해주세요.'}
            value={post.title}
          />

          <div className={style.innerNavWrap}>
            <section className={style.selectWrap}>
              <CustomSelect
                selectOptions={contentTypeSelectOptions}
                selectId={'postContentTypeSelect'}
                name={'contentType'}
                styleClass={style.selectType}
              />
              <CustomSelect
                selectOptions={visibleTypeSelectOptions}
                selectId={'postVisibilitySelect'}
                name={'visibility'}
                styleClass={style.selectVisibility}
              />
            </section>
          </div>
        </section>
        <section className={style.contentWrap}>
          <textarea
            name={'content'}
            id={''}
            className={style.content}
            placeholder={'수정할 내용을 입력해주세요.'}
            defaultValue={post.content}
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

export default UpdatePostForm;
