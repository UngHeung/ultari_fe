'use client';

import { authAxios } from '@/apis/axiosAuth';
import BaseButton from '@/components/common/BaseButton';
import { BASE_URL } from '@/components/common/constants/pathConst';
import PostList from '@/components/post/PostList';
import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { SliceOptions } from '@/components/stores/constants/stateOptions';
import {
  OrderTypes,
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
        const { postList, nextPath } = await getPostList(
          findOptions,
          getPostpath,
          orderBy,
        );

        setPosts(postList);
        savePostList(dispatch, orderBy, postList, getPostpath);
        setGetPostPath(nextPath);
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

async function getPostList(
  findOptions: string,
  path: string,
  orderBy: OrderTypes,
) {
  let url = '';

  if (orderBy !== 'ASC' && orderBy !== 'DESC') {
    orderBy = 'ASC';
  }

  if (findOptions.length) {
    url = `${BASE_URL}/post?${findOptions}`;
  } else {
    url = path.length ? path : `${BASE_URL}/post?order__createAt=${orderBy}`;
  }

  const response = await authAxios.get(url);

  return {
    postList: response.data.data,
    nextPath: response.data.next,
  };
}

function savePostList(
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
