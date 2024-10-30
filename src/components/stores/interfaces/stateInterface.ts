import { ModalType } from '@/components/modal/constants/modalConst';
import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { OrderTypes, RouterType, SortTypes } from '../constants/stateOptions';
import { UserStoreOption } from '../user/userStore';

export interface SliceOptions {
  modal: ModalState;
  post: PostState;
  postList: PostListState;
  user: UserStoreOption;
  logged: LoggedState;
}

export interface ModalState {
  title?: string;
  type: ModalType;
  success?: boolean;
  message: string;
  routerType: RouterType;
  leftPath?: string;
  rightPath?: string;
  modalIsShow: boolean;
}

export interface PostState extends PostOptions {}

export interface OrderdPostListState {
  data: PostState[];
  cursor: CursorOption;
}

export interface CursorOption {
  id: number;
  value: number;
}

export interface PostListState {
  asc: OrderdPostListState;
  desc: OrderdPostListState;
  likes: OrderdPostListState;
  views: OrderdPostListState;
  orderBy: OrderTypes;
  sortBy: SortTypes;
}

export interface LoggedState {
  isLoggedIn: boolean;
}
