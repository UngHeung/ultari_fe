import { BaseInputOptions } from '../constants/BaseElementsInterfaces';
import { useState } from 'react';

/**
 * @param id? string
 * @param className? string
 * @param name string
 * @param type text | password | email | number
 * @param placeholder? string
 * @param value? string
 * @param setValue? React.Dispatch<React.SetStateActions<string>>
 */
const BaseInput = (props: BaseInputOptions) => {
  const [baseValue, setBaseValue] = useState('');

  return (
    <input
      id={props.id}
      name={props.name}
      className={`${props.className} ${props.styleClass}`}
      type={props.type}
      placeholder={props.placeholder}
      onChange={event =>
        props.setValue
          ? props.setValue(event.target.value)
          : setBaseValue!(event.target.value)
      }
      value={props.value ?? baseValue}
    />
  );
};

export default BaseInput;
