import React, { MouseEvent, SetStateAction } from 'react';

export interface BaseButtonOptions {
  id?: string;
  className?: string;
  type: 'submit' | 'button';
  value: string | JSX.Element;
  styleClass?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export interface BaseInputOptions {
  id?: string;
  className?: string;
  name: string;
  type: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  value?: string;
  styleClass?: string;
  setValue?: React.Dispatch<SetStateAction<string>>;
  readOnly?: boolean;
}

export interface BaseTextareaOptions {
  id?: string;
  className?: string;
  name: string;
  placeholder?: string;
  value?: string;
  styleClass?: string;
  setValue?: React.Dispatch<SetStateAction<string>>;
  readonly?: boolean;
}
