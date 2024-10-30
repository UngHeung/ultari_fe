import { makeResponseResult } from '@/components/common/functions/returnResponse';
import {
  OrderTypes,
  SortTypes,
} from '@/components/stores/constants/stateOptions';
import { CursorOption } from '@/components/stores/interfaces/stateInterface';
import usePostListStore, {
  PostListStore,
} from '@/components/stores/post/postListStore';
import React, { SetStateAction } from 'react';
import fetchDataFromStoreOrServer from '../functions/fetchDataFromStoreOrServer';
import mapDispatchToProps from '../functions/mapDispatchToProps';
import {
  ContentTypeOptions,
  PostOptions,
  VisibilityOptions,
} from '../interfaces/postInterfaces';

const PostListPaginate = ({
  orderBy,
  sortBy,
  cursor,
  setCursor,
  setPostList,
  scope,
  type,
}: {
  orderBy: OrderTypes;
  sortBy: SortTypes;
  cursor: CursorOption;
  setCursor: React.Dispatch<SetStateAction<CursorOption>>;
  setPostList: React.Dispatch<SetStateAction<PostOptions[]>>;
  scope?: VisibilityOptions;
  type?: ContentTypeOptions;
}) => {
  const setPostListOrderByDesc = usePostListStore(
    (state: PostListStore) => state.setDesc,
  );
  const setPostListOrderByAsc = usePostListStore(
    (state: PostListStore) => state.setAsc,
  );
  const setPostListOrderByLikes = usePostListStore(
    (state: PostListStore) => state.setLikes,
  );
  const setPostListOrderBy = usePostListStore(
    (state: PostListStore) => state.setOrderBy,
  );
  const setPostListSortBy = usePostListStore(
    (state: PostListStore) => state.setSortBy,
  );

  async function paginateProcess() {
    try {
      const postData = await fetchDataFromStoreOrServer(
        false,
        'post',
        sortBy,
        10,
        orderBy,
        cursor,
        scope,
        type,
      );

      setPostList(prevList => [...prevList, ...postData.data]);
      setCursor(postData.cursor);

      mapDispatchToProps(
        postData.data,
        cursor,
        orderBy,
        sortBy,
        setPostListOrderByDesc,
        setPostListOrderByLikes,
        setPostListOrderByAsc,
        setPostListSortBy,
        setPostListOrderBy,
      );
    } catch (error: any) {
      makeResponseResult(error);
    }
  }

  return (
    <button type={'button'} onClick={paginateProcess}>
      더보기
    </button>
  );
};

export default PostListPaginate;
