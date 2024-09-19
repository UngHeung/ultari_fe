import BaseInput from '../../common/BaseInput';
import { PostInputOptions } from '../interfaces/postInterfaces';

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
