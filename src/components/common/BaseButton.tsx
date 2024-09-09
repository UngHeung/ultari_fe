import { BaseButtonOptions } from './constants/BaseElementsInterfaces';

const BaseButton = (props: BaseButtonOptions) => {
  return (
    <button
      id={props.id}
      className={`${props.className} ${props.styleClass}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      autoFocus={props.autoFocus}
    >
      {props.value}
    </button>
  );
};

export default BaseButton;
