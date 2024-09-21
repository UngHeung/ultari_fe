'use client';

import BaseButton from '@/components/common/BaseButton';
import PostList from '@/components/post/PostList';
import handleGetPostList from '@/components/post/handlers/handleGetPostList';
import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { OrderTypes } from '@/components/stores/constants/stateOptions';
import {
  OrderdPostListState,
  SliceOptions,
} from '@/components/stores/interfaces/stateInterface';
import {
  resetPostList,
  setPostListOrderBy,
  setPostListOrderByAsc,
  setPostListOrderByDesc,
  setPostListOrderByLikes,
  setPostListOrderByViews,
} from '@/components/stores/reducer/PostListReducer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const listPage = () => {
  const dispatch = useDispatch();

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
  const listOrderBy = useSelector(
    (state: SliceOptions) => state.postList.orderType,
  );

  const [nextPath, setNextPath] = useState<string>('');
  const [postList, setPostList] = useState<PostOptions[]>([]);

  useEffect(() => {
    (async () => {
      postListProcess(listOrderBy.value);
    })();
  }, []);

  async function postListProcess(orderBy: OrderTypes) {
    let postData: { list: PostOptions[]; count: number; next: string } = {
      list: [],
      count: 0,
      next: '',
    };

    if (orderBy === 'DESC') {
      postData = await fetchDataFromStoreOrServer(orderBy, listOrderByDesc);
      dispatch(setPostListOrderByDesc(postData));
    } else if (orderBy === 'ASC') {
      postData = await fetchDataFromStoreOrServer(orderBy, listOrderByAsc);
      dispatch(setPostListOrderByAsc(postData));
    } else if (orderBy === 'LIKES') {
      postData = await fetchDataFromStoreOrServer(orderBy, listOrderByLikes);
      dispatch(setPostListOrderByLikes(postData));
    } else if (orderBy === 'VIEWS') {
      postData = await fetchDataFromStoreOrServer(orderBy, listOrderByViews);
      dispatch(setPostListOrderByViews(postData));
    }

    setPostList(postData.list);
    setNextPath(postData.next);
  }

  return (
    <>
      <menu>
        <ul>
          <li key={'btndesc'}>
            <BaseButton
              type={'button'}
              value={'최신순'}
              onClick={async () => {
                dispatch(setPostListOrderBy({ value: 'DESC' }));
                postListProcess('DESC');
              }}
            />
          </li>
          <li key={'btnasc'}>
            <BaseButton
              type={'button'}
              value={'날짜순'}
              onClick={async () => {
                dispatch(setPostListOrderBy({ value: 'ASC' }));
                postListProcess('ASC');
              }}
            />
          </li>
          <li key={'btnlk'}>
            <BaseButton
              type={'button'}
              value={'좋아요'}
              onClick={async () => {
                dispatch(setPostListOrderBy({ value: 'LIKES' }));
                postListProcess('LIKES');
              }}
            />
          </li>
          <li key={'btnvw'}>
            <BaseButton
              type={'button'}
              value={'조회수'}
              onClick={async () => {
                dispatch(setPostListOrderBy({ value: 'VIEWS' }));
                postListProcess('VIEWS');
              }}
            />
          </li>
        </ul>
      </menu>
      <PostList postList={postList} />
      {nextPath && (
        <button
          type={'button'}
          onClick={async () => {
            const orderBy = listOrderBy.value;
            const postData = await moreFetchData(orderBy, nextPath);

            setPostList([...postList, ...postData.list!]);
            setNextPath(postData.next!);

            if (orderBy === 'DESC') {
              dispatch(setPostListOrderByDesc({ ...postData, list: postList }));
            } else if (orderBy === 'ASC') {
              dispatch(setPostListOrderByAsc({ ...postData, list: postList }));
            } else if (orderBy === 'LIKES') {
              dispatch(
                setPostListOrderByLikes({ ...postData, list: postList }),
              );
            } else if (orderBy === 'VIEWS') {
              dispatch(
                setPostListOrderByViews({ ...postData, list: postList }),
              );
            }
          }}
        >
          더보기
        </button>
      )}
    </>
  );
};

async function fetchDataFromStoreOrServer(
  orderBy: OrderTypes,
  listOrderType: OrderdPostListState,
) {
  const likeCountQuery = 'order__likeCount=DESC';
  const viewCountQuery = 'order__viewCount=DESC';

  if (listOrderType.count) {
    return {
      list: listOrderType.list,
      count: listOrderType.list.length,
      next: listOrderType.next,
    };
  } else {
    console.log('first fetching!');
    const { status, success, data } = await handleGetPostList(
      orderBy,
      orderBy === 'LIKES'
        ? likeCountQuery
        : orderBy === 'VIEWS'
          ? viewCountQuery
          : '',
    );

    return {
      list: data!.postList,
      count: data!.count,
      next: data!.nextPath.split('?')[1],
    };
  }
}

async function moreFetchData(orderBy: OrderTypes, nextPath: string) {
  console.log(nextPath);
  const { status, success, data } = await handleGetPostList(orderBy, nextPath);

  return {
    list: data?.postList,
    next: data?.nextPath,
    count: data?.count,
  };
}

export default listPage;
