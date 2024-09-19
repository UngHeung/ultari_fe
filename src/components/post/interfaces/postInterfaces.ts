import { UserOptions } from '@/components/auth/interfaces/authInterface';
import { ImageOptions } from '@/components/common/ImagesSlider';
import {
  BaseButtonOptions,
  BaseInputOptions,
} from '@/components/common/interfaces/BaseElementsInterfaces';

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
