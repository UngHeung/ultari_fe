import { OrderTypes } from '@/components/stores/constants/stateOptions';
import handleGetPostList from '../handlers/handleGetPostList';
import { getPostListOptions } from '../interfaces/postInterfaces';
import composeUrlQuery from './composeUrlQuery';

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

export default moreFetchData;
