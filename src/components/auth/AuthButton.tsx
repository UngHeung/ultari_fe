import BaseButton from '../common/BaseButton';
import style from '../styles/button.module.css';
import { BaseButtonOptions } from '@/components/common/constants/BaseElementsInterfaces';

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
