import BaseButton from '../../common/BaseButton';
import { BaseButtonOptions } from '@/components/common/interfaces/BaseElementsInterfaces';

export interface PostButtonOptions extends BaseButtonOptions {}

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
