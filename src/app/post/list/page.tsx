'use client';

import BaseButton from '@/components/common/BaseButton';
import PostList from '@/components/post/PostList';
import handleGetPostList from '@/components/post/handlers/handleGetPostList';
import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { OrderTypes } from '@/components/stores/constants/stateOptions';
import {
  OrderdPostState,
  SliceOptions,
} from '@/components/stores/interfaces/stateInterface';
import {
  setPostListOrderByAsc,
  setPostListOrderByDesc,
  setPostListOrderByLikes,
  setPostListOrderByViews,
} from '@/components/stores/reducer/PostListReducer';
import { Dispatch } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const listPage = () => {
  const dispatch = useDispatch();

  const [nextPath, setNextPath] = useState<string>('');
  const [postList, setPostList] = useState<PostOptions[]>([]);

  const listOrderByDesc = useSelector(
    (state: SliceOptions) => state.postList.desc,
  );
  const listOrderByAsc = useSelector(
    (state: SliceOptions) => state.postList.asc,
  );
  const listOrderByLikes = useSelector(
    (state: SliceOptions) => state.postList.likes,
  );
  const listOrderByViews = useSelector(
    (state: SliceOptions) => state.postList.views,
  );

  useEffect(() => {
    if (listOrderByDesc.count) {
      const postList = listOrderByDesc.list;
      const nextPath = listOrderByDesc.next;

      setPostList(postList);
      setNextPath(nextPath);
    } else {
      (async () => {
        const { status, success, data } = await handleGetPostList(true);

        if (success && data) {
          setPostList(data.postList);
          setNextPath(data.nextPath);

          dispatchPostList(dispatch, 'DESC', data.postList, data.nextPath);
        }
      })();
    }
  }, []);

  return (
    <>
      <menu>
        <ul>
          <li key={'btndesc'}>
            <BaseButton
              type={'button'}
              value={'최신순'}
              onClick={async () => {
                const aleadyPost = await useOwnedPostList(
                  dispatch,
                  listOrderByDesc,
                  'DESC',
                );

                setPostList(aleadyPost.postList!);
                setNextPath(aleadyPost.nextPath!);
              }}
            />
          </li>
          <li key={'btnasc'}>
            <BaseButton
              type={'button'}
              value={'날짜순'}
              onClick={async () => {
                const aleadyPost = await useOwnedPostList(
                  dispatch,
                  listOrderByAsc,
                  'ASC',
                );

                setPostList(aleadyPost.postList!);
                setNextPath(aleadyPost.nextPath!);
              }}
            />
          </li>
          <li key={'btnlk'}>
            <BaseButton
              type={'button'}
              value={'좋아요'}
              onClick={async () => {
                const aleadyPost = await useOwnedPostList(
                  dispatch,
                  listOrderByLikes,
                  'LIKES',
                  'order__likeCount=DESC',
                );

                setPostList(aleadyPost.postList!);
                setNextPath(aleadyPost.nextPath!);
              }}
            />
          </li>
          <li key={'btnvw'}>
            <BaseButton
              type={'button'}
              value={'조회수'}
              onClick={async () => {
                const aleadyPost = await useOwnedPostList(
                  dispatch,
                  listOrderByViews,
                  'VIEWS',
                  'order__viewCount=DESC',
                );

                setPostList(aleadyPost.postList!);
                setNextPath(aleadyPost.nextPath!);
              }}
            />
          </li>
        </ul>
      </menu>
      <PostList postList={postList} />
    </>
  );
};

async function useOwnedPostList(
  dispatch: Dispatch,
  postState: OrderdPostState,
  orderBy?: OrderTypes,
  findOptions?: string,
) {
  const postList = postState.list;
  const nextPath = postState.next;
  const postFirstLoad = postState.firstLoad;

  if (!postFirstLoad) {
    return {
      postList: postList,
      nextPath: nextPath,
    };
  } else {
    const { status, success, data } = await handleGetPostList(
      true,
      orderBy,
      findOptions,
    );

    dispatchPostList(dispatch, orderBy!, data!.postList, data!.nextPath);

    return {
      postList: data!.postList,
      nextPath: data!.nextPath,
    };
  }
}

function dispatchPostList(
  dispatch: Dispatch,
  orderBy: OrderTypes,
  postList: PostOptions[],
  nextPath: string,
) {
  const dispatchData = {
    list: postList,
    count: postList.length,
    next: nextPath,
    firstLoad: false,
  };

  if (orderBy === 'DESC') {
    dispatch(setPostListOrderByDesc(dispatchData));
  } else if (orderBy === 'ASC') {
    dispatch(setPostListOrderByAsc(dispatchData));
  } else if (orderBy === 'LIKES') {
    dispatch(setPostListOrderByLikes(dispatchData));
  } else if (orderBy === 'VIEWS') {
    console.log('views save');
    dispatch(setPostListOrderByViews(dispatchData));
  }
}

export default listPage;
