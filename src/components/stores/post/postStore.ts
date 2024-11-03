import { PostOptions } from '@/components/post/interfaces/postInterfaces';
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
}

const usePostStore = create<PostStore>(set => ({
  post: initialState,
  setPost: (post: PostOptions) => set({ post }),
  resetPost: () => set({ post: initialState }),
}));

export default usePostStore;
