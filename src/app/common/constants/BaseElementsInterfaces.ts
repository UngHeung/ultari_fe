import React, { MouseEvent } from "react";

export interface BaseButtonOptions {
  id?: string;
  className?: string;
  type: 'submit' | 'button';
  value: string;
  styleClass?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
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
}