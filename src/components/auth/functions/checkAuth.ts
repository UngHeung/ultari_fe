import { PostPagePosition } from '@/app/post/layout';
import { TeamPageType } from '@/app/team/layout';
import { UserPageType } from '@/app/user/layout';

export function checkAuth(
  type: PostPagePosition | TeamPageType | UserPageType,
  isLoggedIn: boolean,
) {
  if (
    (!isLoggedIn && type === 'write') ||
    (!isLoggedIn && type === 'update') ||
    (!isLoggedIn && type === 'list') ||
    (!isLoggedIn && type === 'create') ||
    (!isLoggedIn && type === 'my')
  ) {
    return false;
  }

  return true;
}
