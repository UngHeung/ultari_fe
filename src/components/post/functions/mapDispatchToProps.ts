import {
  OrderTypes,
  SortTypes,
} from '@/components/stores/constants/stateOptions';
import { CursorOption } from '@/components/stores/interfaces/stateInterface';
import {
  setPostListOrderBy,
  setPostListOrderByAsc,
  setPostListOrderByDesc,
  setPostListOrderByLikes,
  setPostListSortBy,
} from '@/components/stores/reducer/PostListReducer';
import { Dispatch } from '@reduxjs/toolkit';

const mapDispatchToProps = (
  dispatch: Dispatch,
  data: any[],
  cursor: CursorOption,
  orderBy: OrderTypes,
  sortBy: SortTypes,
) => {
  if (orderBy === 'DESC') {
    if (sortBy === 'id') {
      dispatch(setPostListOrderByDesc({ data, cursor }));
    } else if (sortBy === 'likeCount') {
      dispatch(setPostListOrderByLikes({ data, cursor }));
    }
  } else {
    if (sortBy === 'id') {
      console.log('hi');
      dispatch(setPostListOrderByAsc({ data, cursor }));
    }
  }

  dispatch(setPostListSortBy(sortBy));
  dispatch(setPostListOrderBy(orderBy));
};

export default mapDispatchToProps;
