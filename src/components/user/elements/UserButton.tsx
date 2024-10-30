import BaseButton from '@/components/common/elements/BaseButton';
import { BaseButtonOptions } from '@/components/common/interfaces/baseElementsInterfaces';

export interface UserButtonOptions extends BaseButtonOptions {}

const UserButton = (props: UserButtonOptions) => {
  return (
    <BaseButton
      id={props.id}
      type={props.type}
      value={props.value}
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    />
  );
};

export default UserButton;
