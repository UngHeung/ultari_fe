import { StaticImageData } from 'next/image';
import React, { MouseEvent } from 'react';

export interface BaseButtonOptions {
  id?: string;
  className?: string;
  type: 'submit' | 'button';
  value: string | JSX.Element | StaticImageData;
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
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  readOnly?: boolean;
}
