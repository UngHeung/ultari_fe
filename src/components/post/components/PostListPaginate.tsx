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
  return (
    <button
      type={'button'}
      onClick={async () => {
        const orderBy = listOrderBy.value;
        const postData = await moreFetchData(orderBy, nextPath);
        const composeList = [...postList, ...postData.list!];
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
      }}
    >
      더보기
    </button>
  );
};

export default PostListPaginate;
