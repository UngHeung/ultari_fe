import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { modalType } from '@/components/modal/constants/modalConst';
import { OrderTypes, RouterType } from '../constants/stateOptions';
import { UserOptions } from '@/components/auth/interfaces/authInterface';

export interface SliceOptions {
  modal: ModalState;
  post: PostState;
  postList: PostListState;
  user: UserState;
}

export interface ModalState {
  title?: string;
  type: modalType;
  success?: boolean;
  message: string;
  routerType: RouterType;
  leftPath?: string;
  rightPath?: string;
  modalIsShow: boolean;
}

export interface PostState extends PostOptions {}

export interface PostListState {
  asc: {
    list: PostState[];
    count: number;
    lastIndex: number;
    next: string;
  };
  desc: {
    list: PostState[];
    count: number;
    lastIndex: number;
    next: string;
  };
  likes: {
    list: PostState[];
    count: number;
    lastIndex: number;
    next: string;
  };
}

export interface UserState
  extends Pick<UserOptions, 'id' | 'name' | 'role' | 'isLoggedIn'> {}
