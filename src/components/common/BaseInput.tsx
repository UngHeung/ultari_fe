import { useState } from 'react';
import { BaseInputOptions } from './interfaces/BaseElementsInterfaces';

const BaseInput = (props: BaseInputOptions) => {
  const [baseValue, setBaseValue] = useState<string>(props.value ?? '');

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
      value={baseValue}
      readOnly={props.readOnly}
    />
  );
};

export default BaseInput;
