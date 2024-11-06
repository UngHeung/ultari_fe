import { OrderTypes } from '@/components/stores/constants/stateOptions';
import { CursorOption } from '@/components/stores/interfaces/stateInterface';
import {
  ContentTypeOptions,
  VisibilityOptions,
} from '../interfaces/postInterfaces';

function composeUrlQuery(
  isFirstFetch: boolean,
  target: 'post' | 'comment' | 'user',
  sort: string,
  take: number,
  orderBy: OrderTypes,
  cursor: CursorOption,
  scope?: VisibilityOptions,
  type?: ContentTypeOptions,
): string {
  const orderByQuery = `${target}/pg?sort=${sort}&take=${take}&orderBy=${orderBy}`;
  const cursorQuery =
    cursor && cursor.id >= 0 ? `&id=${cursor.id}&value=${cursor.value}` : '';
  const typeQuery = `&scope=${scope}${type ? `&type=${type}` : ''}`;

  let url = '';

  if (isFirstFetch) {
    url = `/${orderByQuery}${typeQuery}`;
  } else {
    url = `/${orderByQuery}${cursorQuery}${typeQuery}`;
  }

  return url;
}

export default composeUrlQuery;
