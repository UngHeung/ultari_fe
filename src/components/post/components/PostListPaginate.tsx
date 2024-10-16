import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { OrderTypes } from '@/components/stores/constants/stateOptions';
import { Dispatch } from '@reduxjs/toolkit';
import React, { SetStateAction } from 'react';
import mapDispatchToProps from '../functions/mapDispatchToProps';
import moreFetchData from '../functions/moreFetchData';
import { PostOptions } from '../interfaces/postInterfaces';

const PostListPaginate = ({
  dispatch,
  listOrderBy,
  nextPath,
  setNextPath,
  postList,
  setPostList,
}: {
  dispatch: Dispatch;
  listOrderBy: { value: OrderTypes };
  nextPath: string;
  setNextPath: React.Dispatch<SetStateAction<string>>;
  postList: PostOptions[];
  setPostList: React.Dispatch<SetStateAction<PostOptions[]>>;
}) => {
  async function paginateProcess() {
    const orderBy = listOrderBy.value;
    try {
      const postData = await moreFetchData(orderBy, nextPath);
      const composeList = [...postList, ...postData?.list];
      const dispatchData = {
        list: composeList,
        count: composeList.length,
        next: postData.next ?? '',
      };

      setPostList(composeList);
      setNextPath(postData.next!);

      if (orderBy === 'DESC') {
        mapDispatchToProps.desc(dispatch, dispatchData);
      } else if (orderBy === 'ASC') {
        mapDispatchToProps.asc(dispatch, dispatchData);
      }
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
