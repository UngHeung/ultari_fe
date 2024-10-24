import BaseButton from '@/components/common/BaseButton';
import { BaseButtonOptions } from '@/components/common/interfaces/baseElementsInterfaces';

export interface CommentButtonOptions extends BaseButtonOptions {}

const CommentButton = (props: CommentButtonOptions) => {
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

export default CommentButton;
