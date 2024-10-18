import { ContentTypeOptions } from '../interfaces/postInterfaces';

function mapContentType(type: ContentTypeOptions) {
  if (type === 'TYPE_FREE') {
    return '자유';
  } else if (type === 'TYPE_PRAYER') {
    return '기도제목';
  } else if (type === 'TYPE_THANKS') {
    return '감사제목';
  } else if (type === 'TYPE_SHARE') {
    return '나눔';
  }
}

export default mapContentType;
