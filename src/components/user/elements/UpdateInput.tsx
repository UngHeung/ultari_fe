import BaseInput from '@/components/common/BaseInput';
import { BaseInputOptions } from '@/components/common/interfaces/BaseElementsInterfaces';
import style from '../styles/input.module.css';

export interface UpdateInputOptions extends BaseInputOptions {
  labelValue: string;
  description?: string;
  readOnly?: boolean;
}

const UpdateInput = (props: UpdateInputOptions) => {
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

export default UpdateInput;
