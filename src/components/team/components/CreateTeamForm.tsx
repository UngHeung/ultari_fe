import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import useUserStore, { UserStore } from '@/components/stores/user/userStore';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { ModalState } from '../../stores/interfaces/stateInterface';
import TeamButton from '../elements/TeamButton';
import TeamInput from '../elements/TeamInput';
import handleCreateTeam from '../handlers/handleCreateTeam';
import style from '../styles/createTeam.module.css';

const CreateTeamForm = () => {
  const router = useRouter();

  const community = useUserStore((state: UserStore) => state.user.community);
  const setModal = useModalStore((state: ModalStore) => state.setModal);

  const [disabled, setDisabled] = useState(false);

  async function createTeamProcess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { success, message } = await handleCreateTeam(event);

    setDisabled(true);

    const modalData: ModalState = {
      type: success ? 'confirm' : 'alert',
      success,
      message,
      routerType: 'replace',
      modalIsShow: true,
      leftPath: success ? '/team/list' : undefined,
    };

    setModal(modalData);

    setDisabled(false);
  }

  return (
    <form onSubmit={createTeamProcess}>
      <section className={style.inputWrap}>
        <TeamInput
          labelValue={'목장명'}
          name={'name'}
          type={'text'}
          placeholder={' '}
          styleClass={style.input}
        />
        <TeamInput
          labelValue={'소속'}
          name={'community'}
          type={'text'}
          placeholder={' '}
          value={community}
          styleClass={style.input}
          readOnly={true}
        />
        <TeamInput
          labelValue={'설명'}
          name={'description'}
          type={'text'}
          placeholder={' '}
          styleClass={style.input}
        />
      </section>
      <section className={style.buttonWrap}>
        <TeamButton
          type={'submit'}
          value={'전송'}
          disabled={disabled}
          styleClass={style.button}
        />
        <TeamButton
          type={'button'}
          value={'취소'}
          disabled={disabled}
          styleClass={style.button}
          onClick={() => router.back()}
        />
      </section>
    </form>
  );
};

export default CreateTeamForm;
