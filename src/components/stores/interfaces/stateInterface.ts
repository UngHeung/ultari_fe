import { UserOptions } from '@/components/auth/interfaces/authInterface';
import { modalType } from '@/components/modal/constants/modalConst';
import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { OrderTypes, RouterType } from '../constants/stateOptions';

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

export interface OrderdPostListState {
  list: PostState[];
  count: number;
  next: string;
}

export interface PostListState {
  asc: OrderdPostListState;
  desc: OrderdPostListState;
  likes: OrderdPostListState;
  views: OrderdPostListState;
  orderType: { value: OrderTypes };
  firstLoad: { value: boolean };
}

export interface UserState
  extends Pick<UserOptions, 'id' | 'name' | 'role' | 'isLoggedIn'> {}
