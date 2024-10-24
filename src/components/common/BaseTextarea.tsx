import { useState } from 'react';
import { BaseTextareaOptions } from './interfaces/baseElementsInterfaces';

const BaseTextarea = (props: BaseTextareaOptions) => {
  const [baseValue, setBaseValue] = useState<string>(props.value ?? '');

  return (
    <textarea
      id={props.id}
      className={`${props.className} ${props.styleClass}`}
      name={props.name}
      placeholder={props.placeholder}
      onChange={event =>
        props.setValue
          ? props.setValue(event.target.value)
          : setBaseValue(event.target.value)
      }
      value={props.value ?? baseValue}
      readOnly={props.readonly}
    />
  );
};

export default BaseTextarea;
