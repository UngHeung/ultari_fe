import { UserOptions } from '@/components/auth/interfaces/authInterface';
import {
  BaseButtonOptions,
  BaseInputOptions,
} from '@/components/common/interfaces/BaseElementsInterfaces';
import { ImageOptions } from '@/components/common/interfaces/commonInterface';

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

export interface DetailLikeCountOptions {
  authorId: number;
  postId: number;
  likeCount: number;
}
