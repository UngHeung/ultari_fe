import BaseButton from '@/components/common/elements/BaseButton';
import { BaseButtonOptions } from '@/components/common/interfaces/baseElementsInterfaces';

export interface AuthButtonOptions extends BaseButtonOptions {}

const AuthButton = (props: AuthButtonOptions) => {
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

export default AuthButton;
