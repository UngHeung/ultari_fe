import { OrderTypes } from '@/components/stores/constants/stateOptions';
import { OrderdPostListState } from '@/components/stores/interfaces/stateInterface';
import handleGetPostList from '../handlers/handleGetPostList';
import { getPostListOptions } from '../interfaces/postInterfaces';
import composeUrlQuery from './composeUrlQuery';

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

export default fetchDataFromStoreOrServer;
