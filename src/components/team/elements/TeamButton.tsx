import BaseButton from '@/components/common/BaseButton';
import { BaseButtonOptions } from '@/components/common/interfaces/baseElementsInterfaces';
import style from '../styles/teamButton.module.css';

export interface TeamButton extends BaseButtonOptions {}

const TeamButton = (props: TeamButton) => {
  return (
    <BaseButton
      id={props.id}
      type={props.type}
      value={props.value}
      styleClass={style.button}
      onClick={props.onClick}
      disabled={props.disabled}
    />
  );
};

export default TeamButton;
