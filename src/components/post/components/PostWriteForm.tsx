import { setModal } from '@/components/stores/reducer/modalRducer';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect from '../../common/CustomSelect';
import {
  ModalState,
  SliceOptions,
} from '../../stores/interfaces/stateInterface';
import { setPost } from '../../stores/reducer/postReducer';
import PostButton from '../elements/PostButton';
import PostInput from '../elements/PostInput';
import handleUploadPost from '../handlers/handleUploadPost';
import style from '../styles/write.module.css';
import ImageUploadForm from './ImageUploadForm';

const PostWriteForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedFilenames, setSelectedFilenames] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const user = useSelector((state: SliceOptions) => state.user);

  async function postWriteProcess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setDisabled(true);

    const { data, success, message } = await handleUploadPost(
      event,
      'new',
      selectedFilenames,
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

    dispatch(setModal(modalData));
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

export default PostWriteForm;
