import { VisibilityOptions } from '../interfaces/postInterfaces';

function mapVisibility(type: VisibilityOptions) {
  if (type === 'SCOPE_PUBLIC') {
    return '전체공개';
  } else if (type === 'SCOPE_TEAM') {
    return '목장 공개';
  } else if (type === 'SCOPE_PERSONAL') {
    return '비공개';
  }
}

export default mapVisibility;
