import useMenuBoxChildStore, {
  MenuBoxChildStore,
} from '@/components/stores/menuboxChildrenStore';
import { resetPostList } from '@/components/stores/reducer/PostListReducer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderTypes, SortTypes } from '../../stores/constants/stateOptions';
import {
  CursorOption,
  SliceOptions,
} from '../../stores/interfaces/stateInterface';
import fetchDataFromStoreOrServer from '../functions/fetchDataFromStoreOrServer';
import mapDispatchToProps from '../functions/mapDispatchToProps';
import {
  ContentTypeOptions,
  GetPostListOptions,
  PostOptions,
} from '../interfaces/postInterfaces';
import style from '../styles/list.module.css';
import ListItem from './ListItem';
import ListMenu from './ListMenu';
import PostListPaginate from './PostListPaginate';

const PostList = () => {
  const dispatch = useDispatch();

  const listOrderBy = useSelector(
    (state: SliceOptions) => state.postList.orderBy,
  );
  const listSortBy = useSelector(
    (state: SliceOptions) => state.postList.sortBy,
  );

  const postListOrderByLikes = useSelector(
    (state: SliceOptions) => state.postList.likes,
  );
  const postListOrderByDesc = useSelector(
    (state: SliceOptions) => state.postList.desc,
  );
  const postListOrderByAsc = useSelector(
    (state: SliceOptions) => state.postList.asc,
  );
  const setMenuBoxChild = useMenuBoxChildStore(
    (state: MenuBoxChildStore) => state.setChild,
  );
  const resetMenuBoxChild = useMenuBoxChildStore(
    (state: MenuBoxChildStore) => state.resetChild,
  );

  const [orderBy, setOrderBy] = useState<OrderTypes>(listOrderBy.value);
  const [sortBy, setSortBy] = useState<SortTypes>(listSortBy.value);
  const [postList, setPostList] = useState<PostOptions[]>(
    getPostListFromStore().data,
  );
  const [cursor, setCursor] = useState<CursorOption>(
    getPostListFromStore().cursor,
  );

  useEffect(() => {
    postListProcess();

    setMenuBoxChild(
      <ListMenu
        setSortBy={setSortBy}
        setOrderBy={setOrderBy}
        setCursor={setCursor}
      />,
    );

    return () => {
      dispatch(resetPostList());
      resetMenuBoxChild();
    };
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
      dispatch,
      postData.data,
      postData.cursor,
      orderBy,
      sortBy,
    );

    setPostList(postData.data);
    setCursor(postData.cursor);
  }

  return (
    <>
      <ul className={style.postList}>
        {postList ? (
          postList.map((post: PostOptions, idx: number) => {
            return <ListItem {...post} key={idx} />;
          })
        ) : (
          <li>게시물이 없습니다.</li>
        )}
        <li>
          {cursor && cursor.id !== -1 && (
            <PostListPaginate
              dispatch={dispatch}
              orderBy={orderBy}
              sortBy={sortBy}
              cursor={cursor}
              setCursor={setCursor}
              setPostList={setPostList}
              scope={'SCOPE_PUBLIC'}
            />
          )}
        </li>
      </ul>
    </>
  );
};

export default PostList;
