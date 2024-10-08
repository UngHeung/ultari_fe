import { OrderTypes } from '@/components/stores/constants/stateOptions';
import { OrderdPostListState } from '@/components/stores/interfaces/stateInterface';
import handleGetPostList from '../handlers/handleGetPostList';
import {
  contentTypeOptions,
  getPostListOptions,
  visibilityOptions,
} from '../interfaces/postInterfaces';
import composeUrlQuery from './composeUrlQuery';

async function fetchDataFromStoreOrServer(
  orderBy: OrderTypes,
  listOrderType: OrderdPostListState,
  visibility?: visibilityOptions,
  contentType?: contentTypeOptions,
): Promise<getPostListOptions> {
  const whereVisibility = 'where__visibility=';
  const whereContentType = 'where__contentType=';

  if (listOrderType.count) {
    return {
      list: listOrderType.list,
      count: listOrderType.list.length,
      next: listOrderType.next,
    };
  } else {
    const url = composeUrlQuery(
      true,
      orderBy,

      `${visibility ? whereVisibility + visibility : ''}${visibility && contentType ? '&' : ''}${contentType ? whereContentType + contentType : ''}`,
    );

    const { data } = await handleGetPostList(url);

    return {
      list: data?.data ?? [],
      count: data?.count ?? -1,
      next: data?.next?.split('?')[1] || '',
    };
  }
}

export default fetchDataFromStoreOrServer;
