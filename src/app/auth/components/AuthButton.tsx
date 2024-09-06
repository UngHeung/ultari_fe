import BaseButton from '@/app/common/components/elements/BaseButton';
import style from '../styles/button.module.css';
import { BaseButtonOptions } from '@/app/common/constants/BaseElementsInterfaces';

export interface AuthButtonOptions extends BaseButtonOptions {}

/**
 * @param BaseButtonOptions - id?, type, value, onClick?
 */
const AuthButton = (props: AuthButtonOptions) => {
  return (
    <BaseButton
      id={props.id}
      type={props.type}
      value={props.value}
      styleClass={style.button}
      onClick={props.onClick}
    />
  );
};

export default AuthButton;
