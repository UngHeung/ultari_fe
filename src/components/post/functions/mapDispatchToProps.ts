import { GetPostListOptions } from '@/components/post/interfaces/postInterfaces';
import {
  setPostListOrderByAsc,
  setPostListOrderByDesc,
  setPostListOrderByLikes,
  setPostListOrderByViews,
} from '@/components/stores/reducer/PostListReducer';
import { Dispatch } from '@reduxjs/toolkit';

const mapDispatchToProps = {
  desc: (dispatch: Dispatch, data: GetPostListOptions) =>
    dispatch(setPostListOrderByDesc(data)),
  asc: (dispatch: Dispatch, data: GetPostListOptions) =>
    dispatch(setPostListOrderByAsc(data)),
  likes: (dispatch: Dispatch, data: GetPostListOptions) =>
    dispatch(setPostListOrderByLikes(data)),
  views: (dispatch: Dispatch, data: GetPostListOptions) =>
    dispatch(setPostListOrderByViews(data)),
};

export default mapDispatchToProps;
