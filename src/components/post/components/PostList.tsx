import Loading from '@/components/common/components/Loading';
import usePostListStore, {
  PostListStore,
} from '@/components/stores/post/postListStore';
import { useEffect, useState } from 'react';
import { CursorOption } from '../../stores/interfaces/stateInterface';
import fetchDataFromStoreOrServer from '../functions/fetchDataFromStoreOrServer';
import mapDispatchToProps from '../functions/mapDispatchToProps';
import {
  ContentTypeOptions,
  GetPostListOptions,
  PostOptions,
} from '../interfaces/postInterfaces';
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

  const orderBy = usePostListStore((state: PostListStore) => state.orderBy);
  const sortBy = usePostListStore((state: PostListStore) => state.sortBy);

  const [postList, setPostList] = useState<PostOptions[]>([]);
  const [cursor, setCursor] = useState<CursorOption>({ id: -1, value: -1 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    postListProcess();
  }, [sortBy, orderBy]);

  function getPostListFromStore() {
    if (orderBy === 'DESC' && sortBy === 'id') {
      return postListOrderByDesc;
    } else if (orderBy === 'DESC' && sortBy === 'likeCount') {
      return postListOrderByLikes;
    } else if (orderBy === 'ASC' && sortBy === 'id') {
      return postListOrderByAsc;
    } else {
      return postListOrderByDesc;
    }
  }

  async function postListProcess(contentType?: ContentTypeOptions) {
    const postData: GetPostListOptions = {
      data: postList,
      cursor,
    };

    if (getPostListFromStore().data.length > 0) {
      postData.data = getPostListFromStore().data;
      postData.cursor = getPostListFromStore().cursor;
    } else {
      const response = await fetchDataFromStoreOrServer(
        true,
        'post',
        sortBy,
        10,
        orderBy,
        postData.cursor,
        'SCOPE_PUBLIC',
        contentType,
      );

      postData.data = response.data;
      postData.cursor = response.cursor;
    }

    mapDispatchToProps(
      postData.data,
      postData.cursor,
      orderBy,
      sortBy,
      setPostListOrderByDesc,
      setPostListOrderByLikes,
      setPostListOrderByAsc,
    );

    setPostList(postData.data);
    setCursor(postData.cursor);
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
              {isLoading && <Loading />}
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
