import { UserOptions } from '@/components/auth/interfaces/authInterface';
import {
  BaseButtonOptions,
  BaseInputOptions,
} from '@/components/common/interfaces/BaseElementsInterfaces';
import { ImageOptions } from '@/components/common/interfaces/commonInterface';
import { UserState } from '@/components/stores/interfaces/stateInterface';

export interface PostInputOptions extends BaseInputOptions {}
export interface PostButtonOptions extends BaseButtonOptions {}

export interface PostAuthor extends UserOptions {}

export interface PostOptions {
  id: number;
  title: string;
  content: string;
  visibility: visibilityOptions;
  contentType: contentTypeOptions;
  likeCount: number;
  likers: UserOptions[] | UserState[];
  viewCount: number;
  author: UserOptions;
  images?: ImageOptions[];
  createAt: string;
  updateAt: string;
}

export type visibilityOptions =
  | 'SCOPE_PUBLIC'
  | 'SCOPE_TEAM'
  | 'SCOPE_PERSONAL';

export type contentTypeOptions =
  | 'TYPE_THANKS'
  | 'TYPE_PRAYER'
  | 'TYPE_SHARE'
  | 'TYPE_FREE';

export interface getPostOptions {
  postList: PostOptions[];
  cursor: { after: number };
  count: number;
  nextPath: string;
}

export interface getPostListOptions {
  list: PostOptions[];
  count: number;
  next: string;
}

export type PostWriteTypes = 'new' | 'update';

export interface DetailLikeCountOptions {
  authorId: number;
  postId: number;
  likers: UserState[];
}
