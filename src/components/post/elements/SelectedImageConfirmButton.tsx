import BaseButton from '@/components/common/BaseButton';
import { BaseButtonOptions } from '@/components/common/interfaces/BaseElementsInterfaces';
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
      value={
        <>
          <svg
            width="14"
            height="15"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={style.svg}
          >
            <g clipPath="url(#clip0_20_10)">
              <path
                d="M12.8496 3.08789C13.2158 3.4541 13.2158 4.04883 12.8496 4.41504L5.34961 11.915C4.9834 12.2813 4.38867 12.2813 4.02246 11.915L0.272461 8.16504C-0.09375 7.79883 -0.09375 7.2041 0.272461 6.83789C0.638672 6.47168 1.2334 6.47168 1.59961 6.83789L4.6875 9.92285L11.5254 3.08789C11.8916 2.72168 12.4863 2.72168 12.8525 3.08789H12.8496Z"
                className={style.path}
              />
            </g>
            <defs>
              <clipPath id="clip0_20_10">
                <rect className={style.rect} width="13.125" height="15" />
              </clipPath>
            </defs>
          </svg>
        </>
      }
      onClick={onClick}
      styleClass=""
      disabled={disabled}
    />
  );
};

export default SelectedImageConfirmButton;
