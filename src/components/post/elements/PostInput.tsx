import { BaseInputOptions } from '@/components/common/interfaces/BaseElementsInterfaces';
import BaseInput from '../../common/BaseInput';

export interface PostInputOptions extends BaseInputOptions {}

const PostInput = (props: PostInputOptions) => {
  return (
    <div className={props.className}>
      <BaseInput
        name={props.name}
        id={props.id}
        className={`${props.className} ${props.styleClass}`}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
      />
    </div>
  );
};

export default PostInput;
