import { OrderTypes } from '@/components/stores/constants/stateOptions';

function composeUrlQuery(
  isFirstFetch: boolean,
  orderBy?: OrderTypes,
  findOptions?: string,
): string {
  const orderByCreateAt =
    orderBy === 'ASC' || orderBy === 'DESC' ? orderBy : '';

  let url = '';

  if (isFirstFetch) {
    url = `post?order__createAt=${orderByCreateAt || 'DESC'}`;

    if (findOptions) {
      url += `&${findOptions}`;
    }
  } else {
    url = `post?${findOptions}`;
  }

  return url;
}

export default composeUrlQuery;
