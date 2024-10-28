import { UserOptions } from '@/components/auth/interfaces/authInterface';
import {
  BaseButtonOptions,
  BaseInputOptions,
} from '@/components/common/interfaces/baseElementsInterfaces';
import { ImageOptions } from '@/components/common/interfaces/commonInterface';
import { UserState } from '@/components/stores/interfaces/stateInterface';

export interface PostInputOptions extends BaseInputOptions {}
export interface PostButtonOptions extends BaseButtonOptions {}

export interface PostAuthor extends UserOptions {}

export interface PostOptions {
  id: number;
  title: string;
  content: string;
  visibility: VisibilityOptions;
  contentType: ContentTypeOptions;
  likeCount: number;
  likers: UserOptions[] | UserState[];
  viewCount: number;
  author: UserOptions;
  images?: ImageOptions[];
  comments?: CommentOptions[];
  createAt: string;
  updateAt: string;
}

export interface CommentOptions {
  id: number;
  writer: UserOptions;
  content: string;
  createAt: string;
  updateAt: string;
}

export type VisibilityOptions =
  | 'SCOPE_PUBLIC'
  | 'SCOPE_TEAM'
  | 'SCOPE_PERSONAL';

export type ContentTypeOptions =
  | 'TYPE_THANKS'
  | 'TYPE_PRAYER'
  | 'TYPE_SHARE'
  | 'TYPE_FREE';

export interface GetPostOptions {
  postList: PostOptions[];
  cursor: { after: number };
  count: number;
  nextPath: string;
}

export interface GetPostListOptions {
  data: PostOptions[];
  cursor: {
    id: number;
    value: number;
  };
}

export type PostWriteTypes = 'new' | 'update';

export interface DetailLikeCountOptions {
  authorId: number;
  postId: number;
  likers: UserState[];
}
