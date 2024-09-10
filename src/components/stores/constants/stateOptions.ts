import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { ModalState } from '../reducer/modalRducer';

export interface SliceOptions {
  modal: ModalState;
  post: PostOptions;
}
