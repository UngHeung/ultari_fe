import BaseInput from '../common/BaseInput';
import style from './styles/input.module.css';
import { BaseInputOptions } from '@/components/common/constants/baseElementsInterfaces';

export interface AuthInputOptions extends BaseInputOptions {
  labelValue: string;
}

const AuthInput = (props: AuthInputOptions) => {
  return (
    <div className={style.inputWrap}>
      <label className={style.inputLabel} htmlFor={props.id}>
        {props.labelValue}
      </label>
      <BaseInput
        name={props.name}
        id={props.id}
        className={`${props.className} ${style.authInput}`}
        type={props.type}
        placeholder={props.placeholder}
      />
      <span className={`${style.messageWrap} ${style.failure}`}></span>
    </div>
  );
};

export default AuthInput;
