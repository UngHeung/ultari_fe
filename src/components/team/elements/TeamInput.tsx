import BaseInput from '@/components/common/BaseInput';
import { BaseInputOptions } from '@/components/common/interfaces/BaseElementsInterfaces';
import React from 'react';
import style from '../styles/teamInput.module.css';

export interface TeamInputOptions extends BaseInputOptions {
  labelValue: string;
  description?: string;
  readOnly?: boolean;
}

const TeamInput = (props: TeamInputOptions) => {
  return (
    <div className={style.inputWrap}>
      <BaseInput
        name={props.name}
        id={props.id}
        className={`${props.className} ${style.teamInput}`}
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

export default TeamInput;
