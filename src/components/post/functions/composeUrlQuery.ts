import { BASE_URL } from '@/components/common/constants/pathConst';
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
    url = `${BASE_URL}/post?order__createAt=${orderByCreateAt || 'DESC'}`;

    if (findOptions) {
      url += `&${findOptions}`;
    }
  } else {
    url = `${BASE_URL}/post?${findOptions}`;
  }

  return url;
}

export default composeUrlQuery;
