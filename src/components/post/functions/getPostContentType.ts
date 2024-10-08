import {
  contentTypeOptions,
  visibilityOptions,
} from '../interfaces/postInterfaces';

export function getVisibilityType(visibility: visibilityOptions) {
  switch (visibility) {
    case 'SCOPE_PUBLIC':
      return '전체공개';
    case 'SCOPE_TEAM':
      return '목장공개';
    case 'SCOPE_PERSONAL':
      return '비공개';
  }
}

export function getPostType(contentType: contentTypeOptions) {
  switch (contentType) {
    case 'TYPE_FREE':
      return '자유';
    case 'TYPE_SHARE':
      return '나눔';
    case 'TYPE_PRAYER':
      return '기도제목';
    case 'TYPE_THANKS':
      return '감사제목';
  }
}
