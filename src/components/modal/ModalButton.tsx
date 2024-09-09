import BaseButton from '../common/BaseButton';
import { BaseButtonOptions } from '../common/constants/BaseElementsInterfaces';

export interface ModalButtonOptions extends BaseButtonOptions {}

const ModalButton = ({
  id,
  type,
  value,
  styleClass,
  onClick,
}: ModalButtonOptions) => {
  return (
    <BaseButton
      id={id}
      type={type}
      value={value}
      styleClass={styleClass}
      onClick={onClick}
    />
  );
};

export default ModalButton;
