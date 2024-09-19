import BaseButton from '../../common/BaseButton';
import { PostButtonOptions } from '../interfaces/postInterfaces';

const PostButton = (props: PostButtonOptions) => {
  return (
    <BaseButton
      id={props.id}
      type={props.type}
      value={props.value}
      styleClass={props.styleClass}
      onClick={props.onClick}
    />
  );
};

export default PostButton;
