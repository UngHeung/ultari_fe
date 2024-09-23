import { getPostListOptions } from '@/components/post/interfaces/postInterfaces';
import {
  setPostListOrderByAsc,
  setPostListOrderByDesc,
  setPostListOrderByLikes,
  setPostListOrderByViews,
} from '@/components/stores/reducer/PostListReducer';
import { Dispatch } from '@reduxjs/toolkit';

const mapDispatchToProps = {
  desc: (dispatch: Dispatch, data: getPostListOptions) =>
    dispatch(setPostListOrderByDesc(data)),
  asc: (dispatch: Dispatch, data: getPostListOptions) =>
    dispatch(setPostListOrderByAsc(data)),
  likes: (dispatch: Dispatch, data: getPostListOptions) =>
    dispatch(setPostListOrderByLikes(data)),
  views: (dispatch: Dispatch, data: getPostListOptions) =>
    dispatch(setPostListOrderByViews(data)),
};

export default mapDispatchToProps;
