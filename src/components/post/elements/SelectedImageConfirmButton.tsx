import BaseButton from '@/components/common/BaseButton';
import { BaseButtonOptions } from '@/components/common/interfaces/baseElementsInterfaces';
import style from '../styles/selectedImageConfirmButton.module.css';

export interface SelectedImageConfirmButton
  extends Pick<
    BaseButtonOptions,
    'className' | 'type' | 'onClick' | 'disabled'
  > {
  confirmedImages: boolean;
}

const SelectedImageConfirmButton = (props: SelectedImageConfirmButton) => {
  const {
    confirmedImages,
    className,
    type,
    onClick,
    disabled,
  }: SelectedImageConfirmButton = props;

  return (
    <BaseButton
      className={`${style.button} ${confirmedImages ? style.confirmed : ''} ${className ?? ''}`}
      type={type}
      value={uploadIcon}
      onClick={onClick}
      styleClass=""
      disabled={disabled}
    />
  );
};

export default SelectedImageConfirmButton;

const uploadIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 13.575C9.71667 13.575 9.47933 13.479 9.288 13.287C9.096 13.0957 9 12.8583 9 12.575V5.425L7.125 7.3C6.925 7.5 6.69167 7.6 6.425 7.6C6.15833 7.6 5.91667 7.49167 5.7 7.275C5.5 7.075 5.40433 6.83733 5.413 6.562C5.421 6.28733 5.51667 6.05833 5.7 5.875L9.3 2.275C9.4 2.175 9.50833 2.104 9.625 2.062C9.74167 2.02067 9.86667 2 10 2C10.1333 2 10.2583 2.02067 10.375 2.062C10.4917 2.104 10.6 2.175 10.7 2.275L14.3 5.875C14.5 6.075 14.5957 6.31233 14.587 6.587C14.579 6.86233 14.4833 7.09167 14.3 7.275C14.1 7.475 13.8627 7.579 13.588 7.587C13.3127 7.59567 13.075 7.5 12.875 7.3L11 5.425V12.575C11 12.8583 10.9043 13.0957 10.713 13.287C10.521 13.479 10.2833 13.575 10 13.575ZM4 17.575C3.45 17.575 2.97933 17.3793 2.588 16.988C2.196 16.596 2 16.125 2 15.575V13.575C2 13.2917 2.09567 13.054 2.287 12.862C2.479 12.6707 2.71667 12.575 3 12.575C3.28333 12.575 3.521 12.6707 3.713 12.862C3.90433 13.054 4 13.2917 4 13.575V15.575H16V13.575C16 13.2917 16.096 13.054 16.288 12.862C16.4793 12.6707 16.7167 12.575 17 12.575C17.2833 12.575 17.5207 12.6707 17.712 12.862C17.904 13.054 18 13.2917 18 13.575V15.575C18 16.125 17.8043 16.596 17.413 16.988C17.021 17.3793 16.55 17.575 16 17.575H4Z"
      fill="#2D8738"
    />
  </svg>
);
