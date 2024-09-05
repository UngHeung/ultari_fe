import { useState } from "react";

export interface BaseInputOptions {
  id: string;
  name: string;
  type: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * @param id
 * @param type
 * @param placeholder
 * @param value?
 * @param setValue?
 */
const BaseInput = (props: BaseInputOptions) => {
  const [value, setValue] = useState('');
  return (
    <input 
      name={props.name}
      id={props.id} 
      type={props.type} 
      placeholder={props.placeholder} 
      onChange={(event) => props.setValue?props.setValue(event.target.value):setValue!(event.target.value)}
      value={props.value??value}
    />
  )
}

export default BaseInput