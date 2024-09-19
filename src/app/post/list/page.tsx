'use client';

import BaseButton from '@/components/common/BaseButton';
import PostList from '@/components/post/PostList';
import handleGetPostList from '@/components/post/handlers/handleGetPostList';
import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { OrderTypes } from '@/components/stores/constants/stateOptions';
import { SliceOptions } from '@/components/stores/interfaces/stateInterface';
import {
  setPostListOrderBy,
  setPostListOrderByAsc,
  setPostListOrderByDesc,
} from '@/components/stores/reducer/PostListReducer';
import { Dispatch } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const listPage = () => {
  const dispatch = useDispatch();

  const [getPostpath, setGetPostPath] = useState<string>('');
  const [findOptions, setFindOptions] = useState<string>('');
  const [posts, setPosts] = useState<PostOptions[]>([]);

  const listOrderByDesc = useSelector(
    (state: SliceOptions) => state.postList.desc,
  );
  const listOrderByAsc = useSelector(
    (state: SliceOptions) => state.postList.asc,
  );
  const orderBy: OrderTypes = useSelector(
    (state: SliceOptions) => state.postList.orderBy.type,
  );

  useEffect(() => {
    (async () => {
      if (orderBy === 'DESC' && listOrderByDesc.count > 0) {
        setPosts(listOrderByDesc.list);
        setGetPostPath(listOrderByDesc.next);
      } else if (orderBy === 'ASC' && listOrderByAsc.count > 0) {
        setPosts(listOrderByAsc.list);
        setGetPostPath(listOrderByAsc.next);
      } else {
        const { status, success, data } = await handleGetPostList(
          findOptions,
          getPostpath,
          orderBy,
        );

        if (success) {
          setPosts(data?.postList);
          dispatchPostList(dispatch, orderBy, data?.postList, getPostpath);
          setGetPostPath(data?.nextPath);
        }
      }
    })();
  }, [orderBy]);

  return (
    <>
      <menu>
        <ul>
          <li>
            <BaseButton
              type={'button'}
              value={'최신순'}
              onClick={() => {
                dispatch(setPostListOrderBy({ type: 'DESC' }));
                setFindOptions('order__createAt=DESC');
              }}
            />
          </li>
          <li>
            <BaseButton
              type={'button'}
              value={'날짜순'}
              onClick={() => {
                dispatch(setPostListOrderBy({ type: 'ASC' }));
                setFindOptions('order__createAt=ASC');
              }}
            />
          </li>
        </ul>
      </menu>
      <PostList posts={posts} />
    </>
  );
};

function dispatchPostList(
  dispatch: Dispatch,
  orderBy: OrderTypes,
  postList: PostOptions[],
  nextPath: string,
) {
  if (orderBy === 'DESC') {
    dispatch(
      setPostListOrderByDesc({
        desc: {
          data: postList,
          next: nextPath,
          count: postList.length,
        },
      }),
    );
  } else if (orderBy === 'ASC') {
    dispatch(
      setPostListOrderByAsc({
        asc: {
          data: [...postList],
          next: nextPath,
          count: postList.length,
        },
      }),
    );
  }
}

export default listPage;
