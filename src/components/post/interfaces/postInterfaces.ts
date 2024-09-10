export interface PostAuthor {}

export interface PostOptions {
  id: number;
  title: string;
  content: string;
  visibility: string;
  type: string;
  likeCount: number;
  viewCount: number;
  author: any;
  images?: string[];
  createAt: Date | string;
  updateAt: Date | string;
}
