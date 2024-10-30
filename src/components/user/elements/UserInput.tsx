import BaseInput from '@/components/common/elements/BaseInput';
import { BaseInputOptions } from '@/components/common/interfaces/baseElementsInterfaces';
import style from '../styles/input.module.css';

export interface UserInputOptions extends BaseInputOptions {
  labelValue: string;
  description?: string;
  readOnly?: boolean;
}

const UserInput = (props: UserInputOptions) => {
  return (
    <div className={style.inputWrap}>
      <BaseInput
        name={props.name}
        id={props.id}
        className={`${props.className} ${style.userInput}`}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        readOnly={props.readOnly}
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

export default UserInput;
