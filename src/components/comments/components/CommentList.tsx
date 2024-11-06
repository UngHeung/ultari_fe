import { baseAxios } from '@/apis/axiosInstance';
import Loading from '@/components/common/components/Loading';
import usePostListStore, {
  PostListStore,
} from '@/components/stores/post/postListStore';
import usePostStore, { PostStore } from '@/components/stores/post/postStore';
import useUserStore, { UserStore } from '@/components/stores/user/userStore';
import { useEffect, useRef, useState } from 'react';
import { CommentOptions } from '../../post/interfaces/postInterfaces';
import style from '../styles/comment.module.css';
import CommentItem from './CommentItem';

const CommentList = ({ comments }: { comments?: CommentOptions[] }) => {
  const postId = usePostStore((state: PostStore) => state.post.id);
  const post = usePostStore((state: PostStore) => state.post);
  const setPost = usePostStore((state: PostStore) => state.setPost);
  const userId = useUserStore((state: UserStore) => state.user.id);
  const orderBy = usePostListStore((state: PostListStore) => state.orderBy);
  const sortBy = usePostListStore((state: PostListStore) => state.sortBy);
  const updatePost = usePostListStore((state: PostListStore) =>
    orderBy === 'DESC'
      ? sortBy === 'id'
        ? state.updateDesc
        : state.updateLikes
      : state.updateAsc,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [cursor, setCursor] = useState<{ id: -1 } | null>({ id: -1 });

  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          getCommentsByPostId();
        }
      },
      { threshold: 1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading]);

  async function getCommentsByPostId() {
    setIsLoading(true);
    setIsOpened(true);

    const url = `post/pg/${postId}/comments?take=5`;
    const query =
      cursor && cursor.id >= 0
        ? `&id=${cursor.id}`
        : comments
          ? `&id=${comments[0].id + 1}`
          : '';

    if (comments && comments.length > 0 && cursor) {
      const response = await baseAxios(`${url}${query}`);
      const { data, nextCursor } = response.data;

      if (post.comments && post.comments.length > 0) {
        setPost({
          ...post,
          comments: [...post.comments, ...data],
        });

        post.comments = [...post.comments, ...data];
      } else {
        setPost({
          ...post,
          comments: data,
        });
      }

      setCursor(nextCursor);
    }

    updatePost(postId, post);

    setIsLoading(false);
  }

  return (
    <ul className={style.commentList}>
      {comments && comments.length > 0 ? (
        isOpened ? (
          post.comments &&
          post.comments.map((comment, idx) => (
            <CommentItem key={idx} comment={comment} userId={userId} />
          ))
        ) : (
          <div
            className={style.listOpenButton}
            onClick={() => {
              getCommentsByPostId();
            }}
          >
            <CommentItem key={0} comment={comments[0]} userId={userId} />
          </div>
        )
      ) : (
        <li key={'emptykey'} className={style.isEmpty}>
          {'아직 댓글이 없습니다.'}
        </li>
      )}
      {isLoading && (
        <li key={'loadingkey'}>
          <Loading />
        </li>
      )}
      {isOpened && <div ref={observerRef}></div>}
    </ul>
  );
};

export default CommentList;
