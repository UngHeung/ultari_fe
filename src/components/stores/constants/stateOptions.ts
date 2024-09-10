import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { ModalState } from '../reducer/modalRducer';
import { UserOptions } from '../reducer/userReducer';

export interface SliceOptions {
  modal: ModalState;
  post: PostOptions;
  user: UserOptions;
}
