import { makeResponseResult } from '@/components/common/functions/returnResponse';
import {
  OrderTypes,
  SortTypes,
} from '@/components/stores/constants/stateOptions';
import { CursorOption } from '@/components/stores/interfaces/stateInterface';
import { Dispatch } from '@reduxjs/toolkit';
import React, { SetStateAction } from 'react';
import fetchDataFromStoreOrServer from '../functions/fetchDataFromStoreOrServer';
import mapDispatchToProps from '../functions/mapDispatchToProps';
import {
  ContentTypeOptions,
  PostOptions,
  VisibilityOptions,
} from '../interfaces/postInterfaces';

const PostListPaginate = ({
  dispatch,
  orderBy,
  sortBy,
  cursor,
  setCursor,
  setPostList,
  scope,
  type,
}: {
  dispatch: Dispatch;
  orderBy: OrderTypes;
  sortBy: SortTypes;
  cursor: CursorOption;
  setCursor: React.Dispatch<SetStateAction<CursorOption>>;
  setPostList: React.Dispatch<SetStateAction<PostOptions[]>>;
  scope?: VisibilityOptions;
  type?: ContentTypeOptions;
}) => {
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

      mapDispatchToProps(dispatch, postData.data, cursor, orderBy, sortBy);
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
