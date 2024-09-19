import BaseButton from '../common/BaseButton';
import { ModalButtonOptions } from './interfaces/modalInterface';

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
