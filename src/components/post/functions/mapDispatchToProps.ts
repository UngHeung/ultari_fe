import {
  OrderTypes,
  SortTypes,
} from '@/components/stores/constants/stateOptions';
import {
  CursorOption,
  OrderdPostListState,
} from '@/components/stores/interfaces/stateInterface';

const mapDispatchToProps = (
  data: any[],
  cursor: CursorOption,
  orderBy: OrderTypes,
  sortBy: SortTypes,
  setPostListOrderByDesc: (state: OrderdPostListState) => void,
  setPostListOrderByLikes: (state: OrderdPostListState) => void,
  setPostListOrderByAsc: (state: OrderdPostListState) => void,
) => {
  if (orderBy === 'DESC') {
    if (sortBy === 'id') {
      setPostListOrderByDesc({ data, cursor });
    } else if (sortBy === 'likeCount') {
      setPostListOrderByLikes({ data, cursor });
    }
  } else {
    if (sortBy === 'id') {
      console.log('hi');
      setPostListOrderByAsc({ data, cursor });
    }
  }
};

export default mapDispatchToProps;
