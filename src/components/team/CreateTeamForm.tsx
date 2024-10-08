import { authAxios } from '@/apis/axiosInstance';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalState, SliceOptions } from '../stores/interfaces/stateInterface';
import { setModal } from '../stores/reducer/modalRducer';
import TeamButton from './elements/TeamButton';
import TeamInput from './elements/TeamInput';
import style from './styles/createTeam.module.css';

const CreateTeamForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const community = useSelector((state: SliceOptions) => state.user.community);

  const [disabled, setDisabled] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get('name'),
      community: formData.get('community'),
      description: formData.get('description'),
    };

    const url = '/team';

    try {
      const response = await authAxios.post(url, data);
      return {
        status: response.status,
        success: true,
        message: `${data.name}목장이 생성되었습니다.`,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          status: error.status,
          success: false,
          message: error.response?.data.message || '서버에 문제 발생',
        };
      } else {
        return {
          status: 500,
          success: false,
          message: '서버에 문제 발생',
        };
      }
    }
  }

  return (
    <form
      onSubmit={async event => {
        const { success, message } = await handleSubmit(event);

        setDisabled(true);

        const modalData: ModalState = {
          type: success ? 'confirm' : 'alert',
          success,
          message,
          routerType: 'replace',
          modalIsShow: true,
          leftPath: success ? '/team/list' : undefined,
        };

        dispatch(setModal(modalData));

        setDisabled(false);
      }}
    >
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
