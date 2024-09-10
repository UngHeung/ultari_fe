export interface PostAuthor {}

export interface PostOptions {
  id: number;
  title: string;
  content: string;
  visibility: string;
  type: string;
  likeCount: number;
  viewCount: number;
  author: {
    name: string;
  };
  images?: string[];
  commets?: string[];
}
