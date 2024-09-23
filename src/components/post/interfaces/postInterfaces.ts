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
  visibility: string;
  type: string;
  likeCount: number;
  likers: UserOptions[];
  viewCount: number;
  author: UserOptions | null;
  images?: ImageOptions[];
  createAt: Date | string;
  updateAt: Date | string;
}

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
