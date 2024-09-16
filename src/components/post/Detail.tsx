import { SliceOptions } from '@/components/stores/constants/stateOptions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPost } from '../stores/reducer/postReducer';
import style from './styles/detail.module.css';
import { BASE_URL, POST_INCREASE_VIEWS } from '../common/constants/pathConst';
import { authAxios } from '@/apis/axiosAuth';

const Detail = () => {
  const dispatch = useDispatch();
  const post = useSelector((state: SliceOptions) => state.post);
  const authorId = useSelector((state: SliceOptions) => state.post.author?.id);
  const userId = useSelector((state: SliceOptions) => state.user.id);

  useEffect(() => {
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
  console.log(url);
  try {
    const response = await authAxios.patch(url);
    console.log('res => ', response);
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

export default Detail;
