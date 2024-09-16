import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { ModalState } from '../reducer/modalRducer';
import { UserOptions } from '../reducer/userReducer';
import { PostListOptions } from '../reducer/PostListReducer';

export interface SliceOptions {
  modal: ModalState;
  post: PostOptions;
  postList: PostListOptions;
  user: UserOptions;
}
