import { BaseButtonOptions } from './constants/baseElementsInterfaces';

const BaseButton = (props: BaseButtonOptions) => {
  return (
    <button
      id={props.id}
      className={`${props.className} ${props.styleClass}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.value}
    </button>
  );
};

export default BaseButton;
