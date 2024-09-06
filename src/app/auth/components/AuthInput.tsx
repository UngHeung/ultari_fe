import BaseInput from '@/app/common/components/elements/BaseInput';
import style from '../styles/input.module.css';
import { BaseInputOptions } from '@/app/common/constants/BaseElementsInterfaces';

export interface AuthInputOptions extends BaseInputOptions {
  labelValue: string;
}

/**
 * @param BaseInputOptions - (id, type, placeholder)
 * @param labelValue
 */
const AuthInput = (props: AuthInputOptions) => {
  return (
    <div className={style.inputWrap}>
      <label className={style.label} htmlFor={props.id}>
        {props.labelValue}
      </label>
      <BaseInput
        name={props.name}
        id={props.id}
        className={`${props.className} ${props.styleClass}`}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default AuthInput;
