import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderTypes } from '../../stores/constants/stateOptions';
import { SliceOptions } from '../../stores/interfaces/stateInterface';
import { resetPostList } from '../../stores/reducer/PostListReducer';
import fetchDataFromStoreOrServer from '../functions/fetchDataFromStoreOrServer';
import mapDispatchToProps from '../functions/mapDispatchToProps';
import { getPostListOptions, PostOptions } from '../interfaces/postInterfaces';
import style from '../styles/list.module.css';
import ListItem from './ListItem';
import ListMenu from './ListMenu';
import PostListPaginate from './PostListPaginate';

const PostList = () => {
  const dispatch = useDispatch();

  const listOrderByDesc = useSelector(
    (state: SliceOptions) => state.postList.desc,
  );
  const listOrderByAsc = useSelector(
    (state: SliceOptions) => state.postList.asc,
  );
  const listOrderBy = useSelector(
    (state: SliceOptions) => state.postList.orderType,
  );

  const [nextPath, setNextPath] = useState<string>('');
  const [postList, setPostList] = useState<PostOptions[]>([]);

  useEffect(() => {
    postListProcess(listOrderBy.value);

    return () => {
      dispatch(resetPostList());
    };
  }, []);

  async function postListProcess(orderBy: OrderTypes) {
    let postData: getPostListOptions = {
      list: [],
      count: 0,
      next: '',
    };

    if (orderBy === 'DESC') {
      postData = await fetchDataFromStoreOrServer(
        orderBy,
        listOrderByDesc,
        'SCOPE_PUBLIC',
      );

      mapDispatchToProps.desc(dispatch, postData);
    } else if (orderBy === 'ASC') {
      postData = await fetchDataFromStoreOrServer(
        orderBy,
        listOrderByAsc,
        'SCOPE_PUBLIC',
      );

      mapDispatchToProps.asc(dispatch, postData);
    }

    setPostList(postData.list);
    setNextPath(postData.next);
  }

  return (
    <>
      <ListMenu postListProcess={postListProcess} />

      <ul className={style.postList}>
        {postList ? (
          postList.map((post: PostOptions, idx: number) => {
            return <ListItem {...post} key={idx} />;
          })
        ) : (
          <li>게시물이 없습니다.</li>
        )}
      </ul>
      <PostListPaginate
        dispatch={dispatch}
        listOrderBy={listOrderBy}
        nextPath={nextPath}
        setNextPath={setNextPath}
        postList={postList}
        setPostList={setPostList}
      />
    </>
  );
};

export default PostList;
