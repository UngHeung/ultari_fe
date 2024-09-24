import React, { ChangeEvent } from 'react';

export type ImageAcceptTypes =
  | 'image/png'
  | 'image/jpg'
  | 'image/jpeg'
  | 'image/gif'
  | 'image/webp'
  | 'image/svg';

export interface ImageInputOptions {
  useLabel: boolean;
  isMultiple?: boolean;
  labelStyleClass?: string;
  labelValue?: string | JSX.Element;
  name: string;
  accept: ImageAcceptTypes[];
  id?: string;
  styleClass?: string;
  disabeld?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput = (props: ImageInputOptions) => {
  const {
    useLabel,
    isMultiple,
    labelStyleClass,
    labelValue,
    name,
    accept,
    id,
    styleClass,
    disabeld,
    onChange,
  } = props;

  return (
    <>
      {useLabel && (
        <label htmlFor={id} className={labelStyleClass}>
          {labelValue}
        </label>
      )}
      <input
        type="file"
        name={name}
        id={id}
        accept={accept.join(',')}
        onChange={onChange}
        className={styleClass}
        style={{ display: useLabel ? 'none' : 'initial' }}
        multiple={isMultiple ?? false}
        disabled={disabeld ?? false}
      />
    </>
  );
};

export default ImageInput;
