import {
  CommentOptions,
  PostOptions,
} from '@/components/post/interfaces/postInterfaces';
import { create } from 'zustand';

const initialState: PostOptions = {
  id: -1,
  title: '',
  content: '',
  visibility: 'SCOPE_PUBLIC',
  contentType: 'TYPE_FREE',
  likers: [],
  likeCount: 0,
  viewCount: 0,
  author: {
    id: -1,
    account: '',
    name: '',
    phone: '',
    email: '',
    role: 'ROLE_USER',
  },
  images: [],
  comments: [],
  createAt: '',
  updateAt: '',
};

export interface PostStore {
  post: PostOptions;
  setPost: (post: PostOptions) => void;
  resetPost: () => void;

  addComment: (comment: CommentOptions) => void;
  updateComment: (id: number, comment: CommentOptions) => void;
  deleteComment: (id: number) => void;
}

const usePostStore = create<PostStore>(set => ({
  post: initialState,
  setPost: (post: PostOptions) => set({ post }),
  resetPost: () => set({ post: initialState }),

  addComment: (comment: CommentOptions) => {
    set(state => ({
      post: {
        ...state.post,
        comments: [comment, ...(state.post.comments ?? [])],
      },
    }));
  },
  updateComment: (id: number, comment: CommentOptions) =>
    set(state => ({
      post: {
        ...state.post,
        comments: state.post.comments?.map(item =>
          item.id === id ? comment : item,
        ),
      },
    })),
  deleteComment: (id: number) =>
    set(state => ({
      post: {
        ...state.post,
        comments: state.post.comments?.filter(item => item.id !== id),
      },
    })),
}));

export default usePostStore;
