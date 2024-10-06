import React, { useState } from 'react';

export interface PasswordInputOptions {
  className: string;
  name: string;
  placeholder?: string;
}

const PasswordInput = (props: PasswordInputOptions) => {
  const [password, setPassword] = useState<string>('');

  return (
    <input
      type="password"
      name={props.name}
      onChange={event => setPassword(event.target.value)}
      value={password}
      className={props.className}
      placeholder={props.placeholder}
    />
  );
};

export default PasswordInput;
