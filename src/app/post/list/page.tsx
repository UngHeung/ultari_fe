'use client';

import BaseButton from '@/components/common/BaseButton';
import PostList from '@/components/post/PostList';
import fetchDataFromStoreOrServer from '@/components/post/functions/fetchDataFromStoreOrServer';
import mapDispatchToProps from '@/components/post/functions/mapDispatchToProps';
import moreFetchData from '@/components/post/functions/moreFetchData';
import {
  getPostListOptions,
  PostOptions,
} from '@/components/post/interfaces/postInterfaces';
import { OrderTypes } from '@/components/stores/constants/stateOptions';
import { SliceOptions } from '@/components/stores/interfaces/stateInterface';
import { setPostListOrderBy } from '@/components/stores/reducer/PostListReducer';
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
    let postData: getPostListOptions = {
      list: [],
      count: 0,
      next: '',
    };

    if (orderBy === 'DESC') {
      postData = await fetchDataFromStoreOrServer(orderBy, listOrderByDesc);
      mapDispatchToProps.desc(dispatch, postData);
    } else if (orderBy === 'ASC') {
      postData = await fetchDataFromStoreOrServer(orderBy, listOrderByAsc);
      mapDispatchToProps.asc(dispatch, postData);
    } else if (orderBy === 'LIKES') {
      postData = await fetchDataFromStoreOrServer(orderBy, listOrderByLikes);
      mapDispatchToProps.likes(dispatch, postData);
    } else if (orderBy === 'VIEWS') {
      postData = await fetchDataFromStoreOrServer(orderBy, listOrderByViews);
      mapDispatchToProps.views(dispatch, postData);
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
              mapDispatchToProps.desc(dispatch, dispatchData);
            } else if (orderBy === 'ASC') {
              mapDispatchToProps.asc(dispatch, dispatchData);
            } else if (orderBy === 'LIKES') {
              mapDispatchToProps.likes(dispatch, dispatchData);
            } else if (orderBy === 'VIEWS') {
              mapDispatchToProps.views(dispatch, dispatchData);
            }
          }}
        >
          더보기
        </button>
      )}
    </>
  );
};

export default listPage;
