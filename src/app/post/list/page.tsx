'use client';

import BaseButton from '@/components/common/BaseButton';
import { BASE_URL } from '@/components/common/constants/pathConst';
import PostList from '@/components/post/PostList';
import handleGetPostList from '@/components/post/handlers/handleGetPostList';
import {
  getPostListOptions,
  PostOptions,
} from '@/components/post/interfaces/postInterfaces';
import { OrderTypes } from '@/components/stores/constants/stateOptions';
import {
  OrderdPostListState,
  SliceOptions,
} from '@/components/stores/interfaces/stateInterface';
import {
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

  const mapDispatchToProps = {
    desc: (data: getPostListOptions) => dispatch(setPostListOrderByDesc(data)),
    asc: (data: getPostListOptions) => dispatch(setPostListOrderByAsc(data)),
    likes: (data: getPostListOptions) =>
      dispatch(setPostListOrderByLikes(data)),
    views: (data: getPostListOptions) =>
      dispatch(setPostListOrderByViews(data)),
  };

  async function postListProcess(orderBy: OrderTypes) {
    let postData: getPostListOptions = {
      list: [],
      count: 0,
      next: '',
    };

    if (orderBy === 'DESC') {
      postData = await fetchDataFromStoreOrServer(orderBy, listOrderByDesc);
      mapDispatchToProps.desc(postData);
    } else if (orderBy === 'ASC') {
      postData = await fetchDataFromStoreOrServer(orderBy, listOrderByAsc);
      mapDispatchToProps.asc(postData);
    } else if (orderBy === 'LIKES') {
      postData = await fetchDataFromStoreOrServer(orderBy, listOrderByLikes);
      mapDispatchToProps.likes(postData);
    } else if (orderBy === 'VIEWS') {
      postData = await fetchDataFromStoreOrServer(orderBy, listOrderByViews);
      mapDispatchToProps.views(postData);
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
          {/* <li key={'btnlk'}>
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
          </li> */}
        </ul>
      </menu>
      <PostList postList={postList} />
      {nextPath && (
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
              mapDispatchToProps.desc(dispatchData);
            } else if (orderBy === 'ASC') {
              mapDispatchToProps.asc(dispatchData);
            } else if (orderBy === 'LIKES') {
              mapDispatchToProps.likes(dispatchData);
            } else if (orderBy === 'VIEWS') {
              mapDispatchToProps.views(dispatchData);
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
): Promise<getPostListOptions> {
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
    const url = composeUrlQuery(
      true,
      orderBy,
      orderBy === 'LIKES'
        ? likeCountQuery
        : orderBy === 'VIEWS'
          ? viewCountQuery
          : '',
    );
    const { status, success, data } = await handleGetPostList(url);

    return {
      list: data?.postList ?? [],
      count: data?.count ?? -1,
      next: data?.nextPath.split('?')[1] || '',
    };
  }
}

async function moreFetchData(
  orderBy: OrderTypes,
  nextPath: string,
): Promise<getPostListOptions> {
  const url = composeUrlQuery(false, orderBy, nextPath);
  const { status, success, data } = await handleGetPostList(url);

  return {
    list: data?.postList || [],
    count: data?.count || -1,
    next: data?.nextPath || '',
  };
}

export function composeUrlQuery(
  isFirstFetch: boolean,
  orderBy?: OrderTypes,
  findOptions?: string,
): string {
  const orderByCreateAt =
    orderBy === 'ASC' || orderBy === 'DESC' ? orderBy : '';

  let url = '';

  if (isFirstFetch) {
    url = `${BASE_URL}/post?order__createAt=${orderByCreateAt || 'DESC'}`;

    if (findOptions) {
      url += `&${findOptions}`;
    }
  } else {
    url = `${BASE_URL}/post?${findOptions}`;
  }

  return url;
}

export default listPage;
