import Loading from '@/components/common/components/Loading';
import usePostListStore, {
  PostListStore,
} from '@/components/stores/post/postListStore';
import { useEffect, useRef, useState } from 'react';
import { CursorOption } from '../../stores/interfaces/stateInterface';
import fetchDataFromStoreOrServer from '../functions/fetchDataFromStoreOrServer';
import { GetPostListOptions, PostOptions } from '../interfaces/postInterfaces';
import style from '../styles/list.module.css';
import ListItem from './ListItem';
import PostListPaginate from './PostListPaginate';

const PostList = () => {
  const postListOrderByDesc = usePostListStore(
    (state: PostListStore) => state.desc,
  );
  const setPostListOrderByDesc = usePostListStore(
    (state: PostListStore) => state.setDesc,
  );

  const postListOrderByAsc = usePostListStore(
    (state: PostListStore) => state.asc,
  );
  const setPostListOrderByAsc = usePostListStore(
    (state: PostListStore) => state.setAsc,
  );

  const postListOrderByLikes = usePostListStore(
    (state: PostListStore) => state.likes,
  );
  const setPostListOrderByLikes = usePostListStore(
    (state: PostListStore) => state.setLikes,
  );

  const postListOrderByViews = usePostListStore(
    (state: PostListStore) => state.views,
  );
  const setPostListOrderByViews = usePostListStore(
    (state: PostListStore) => state.setViews,
  );

  const orderBy = usePostListStore((state: PostListStore) => state.orderBy);
  const sortBy = usePostListStore((state: PostListStore) => state.sortBy);

  const [postList, setPostList] = useState<PostOptions[]>([]);
  const [cursor, setCursor] = useState<CursorOption>({
    id: -1,
    value: -1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          postListProcess('add');
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

  useEffect(() => {
    setPostList([]);
    setCursor({ id: -1, value: -1 });

    postListProcess('change');
  }, [sortBy, orderBy]);

  function getPostListFromStore() {
    if (orderBy === 'DESC') {
      if (sortBy === 'id') {
        return postListOrderByDesc;
      } else if (sortBy === 'likeCount') {
        return postListOrderByLikes;
      } else if (sortBy === 'viewCount') {
        return postListOrderByViews;
      }
    } else {
      return postListOrderByAsc;
    }
  }

  function setPostListToStore() {
    if (orderBy === 'DESC') {
      if (sortBy === 'id') {
        return setPostListOrderByDesc;
      } else if (sortBy === 'likeCount') {
        return setPostListOrderByLikes;
      } else {
        return setPostListOrderByViews;
      }
    } else {
      return setPostListOrderByAsc;
    }
  }

  async function postListProcess(type: 'change' | 'add') {
    setIsLoading(true);

    const postData: GetPostListOptions = {
      data: [],
      cursor: { id: -1, value: -1 },
    };

    const aleadyList = getPostListFromStore();

    if (type === 'change') {
      if (aleadyList && aleadyList.data.length) {
        postData.data = aleadyList.data;
        postData.cursor = aleadyList.cursor;
      } else {
        const response = await fetchDataFromStoreOrServer(
          true,
          'post',
          sortBy,
          10,
          orderBy,
          cursor,
          'SCOPE_PUBLIC',
        );

        postData.data = response.data;
        postData.cursor = response.cursor;
      }
    } else {
      if (cursor.id === -1) {
        setIsLoading(false);
        return;
      }

      const response = await fetchDataFromStoreOrServer(
        false,
        'post',
        sortBy,
        10,
        orderBy,
        cursor,
        'SCOPE_PUBLIC',
      );

      postData.data = [...postList, ...response.data];
      postData.cursor = response.cursor;
    }

    setPostList(postData.data);
    setCursor(postData.cursor);

    console.log('postData : ', postData);

    const setPostStore = setPostListToStore();

    if (setPostStore) {
      setPostStore(postData);
      setIsLoading(false);
    }
  }

  return (
    <>
      <ul className={style.postList}>
        {postList ? (
          postList.map((post: PostOptions, idx: number) => {
            return <ListItem key={idx} postData={post} />;
          })
        ) : (
          <li>게시물이 없습니다.</li>
        )}
        <li>
          {
            <>
              {isLoading && (
                <li key={'loadingkey'}>
                  <Loading />
                </li>
              )}
              {<div ref={observerRef}></div>}
              {cursor && cursor.id !== -1 && (
                <PostListPaginate
                  orderBy={orderBy}
                  sortBy={sortBy}
                  cursor={cursor}
                  setCursor={setCursor}
                  setPostList={setPostList}
                  scope={'SCOPE_PUBLIC'}
                />
              )}
            </>
          }
        </li>
      </ul>
    </>
  );
};

export default PostList;
