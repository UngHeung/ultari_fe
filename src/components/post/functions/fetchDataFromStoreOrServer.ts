import { OrderTypes } from '@/components/stores/constants/stateOptions';
import { CursorOption } from '@/components/stores/interfaces/stateInterface';
import handleGetPostList from '../handlers/handleGetPostList';
import {
  ContentTypeOptions,
  GetPostListOptions,
  VisibilityOptions,
} from '../interfaces/postInterfaces';
import composeUrlQuery from './composeUrlQuery';

async function fetchDataFromStoreOrServer(
  firstFetch: boolean,
  target: 'post' | 'comment' | 'user',
  sort: string,
  take: number,
  orderBy: OrderTypes,
  cursor: CursorOption,
  scope?: VisibilityOptions,
  type?: ContentTypeOptions,
): Promise<GetPostListOptions> {
  const url = composeUrlQuery(
    firstFetch,
    target,
    sort,
    take,
    orderBy,
    cursor,
    scope,
    type,
  );

  const { data } = await handleGetPostList(url);

  return {
    data: data.data ?? [],
    cursor: data.nextCursor ?? { id: -1, value: -1 },
  };
}

export default fetchDataFromStoreOrServer;
