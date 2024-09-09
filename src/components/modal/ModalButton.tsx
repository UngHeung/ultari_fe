import BaseButton from '../common/BaseButton';
import { BaseButtonOptions } from '../common/constants/BaseElementsInterfaces';

export interface ModalButtonOptions extends BaseButtonOptions {}

const ModalButton = ({
  id,
  type,
  value,
  styleClass,
  autoFocus,
  onClick,
}: ModalButtonOptions) => {
  return (
    <BaseButton
      id={id}
      type={type}
      value={value}
      styleClass={styleClass}
      onClick={onClick}
      autoFocus={autoFocus}
    />
  );
};

export default ModalButton;
