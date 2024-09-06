import { BaseButtonOptions } from '../constants/BaseElementsInterfaces';

/**
 * @param id? string
 * @param className? string
 * @param type submit | button
 * @param value string
 * @param styleClass? string
 * @param onClick (event: MouseEvent<HTMLButtonElements>) => void;
 */
const BaseButton = (props: BaseButtonOptions) => {

  return (
    <button
      id={props.id}
      className={`${props.className} ${props.styleClass}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default BaseButton;
