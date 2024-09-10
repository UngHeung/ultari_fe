import BaseInput from '../../common/BaseInput';
import style from '../styles/input.module.css';
import { BaseInputOptions } from '@/components/common/interfaces/BaseElementsInterfaces';

export interface AuthInputOptions extends BaseInputOptions {
  labelValue: string;
  description?: string;
}

const AuthInput = (props: AuthInputOptions) => {
  return (
    <div className={style.inputWrap}>
      <BaseInput
        name={props.name}
        id={props.id}
        className={`${props.className} ${style.authInput}`}
        type={props.type}
        placeholder={props.placeholder}
      />
      <label className={style.inputLabel} htmlFor={props.id}>
        {props.labelValue}
      </label>
      <span className={`${style.messageWrap} ${style.failure}`}>
        {props.description}
      </span>
    </div>
  );
};

export default AuthInput;