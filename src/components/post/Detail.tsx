import { authAxios } from '@/apis/axiosAuth';
import { SliceOptions } from '@/components/stores/constants/stateOptions';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, POST_INCREASE_VIEWS } from '../common/constants/pathConst';
import { resetPost, setPost } from '../stores/reducer/postReducer';
import style from './styles/detail.module.css';

const Detail = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const post = useSelector((state: SliceOptions) => state.post);
  const authorId = useSelector((state: SliceOptions) => state.post.author?.id);
  const userId = useSelector((state: SliceOptions) => state.user.id);

  useEffect(() => {
    (async () => {
      const postId = pathname.split('/')[2];

      if (post.id === -1) {
        const postData = await getPost(+postId);
        dispatch(setPost(postData));
      }
    })();

    if (authorId && authorId !== userId) {
      increaseViewCount(post.id);
    }

    return () => {
      dispatch(resetPost());
    };
  }, []);

  return (
    <>
      <section className={style.titleWrap}>
        <h2 className={style.title}>{post.title}</h2>
        <span>{`작성일 : ${getDate(post?.createAt.toString())}`}</span>
        {post?.createAt !== post.updateAt && (
          <span>{`수정일 : ${getDate(post?.updateAt.toString())}`}</span>
        )}
      </section>
      <section className={style.contentWrap}>
        <pre className={style.content}>{post.content}</pre>
      </section>
      <section className={style.buttonWrap}>
        <ul></ul>
      </section>
    </>
  );
};

function getDate(inputDate: string) {
  const [date, time] = inputDate?.split('T');

  return `${date} ${time?.split('.')[0]}`;
}

async function increaseViewCount(id: number) {
  const url = `${BASE_URL}/post/${id}/${POST_INCREASE_VIEWS}`;
  try {
    await authAxios.patch(url);
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

async function getPost(id: number) {
  const url = `${BASE_URL}/post/${id}`;

  try {
    const response = await authAxios.get(url);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

export default Detail;
