import { OrderTypes } from '@/components/stores/constants/stateOptions';
import handleGetPostList from '../handlers/handleGetPostList';
import { GetPostListOptions } from '../interfaces/postInterfaces';
import composeUrlQuery from './composeUrlQuery';

async function moreFetchData(
  orderBy: OrderTypes,
  nextPath: string,
): Promise<GetPostListOptions> {
  const url = composeUrlQuery(false, orderBy, nextPath);
  const { data } = await handleGetPostList(url);

  return {
    list: data?.data || [],
    count: data?.count || -1,
    next: data?.next || '',
  };
}

export default moreFetchData;
