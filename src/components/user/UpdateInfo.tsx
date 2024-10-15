import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalState, SliceOptions } from '../stores/interfaces/stateInterface';
import { setModal } from '../stores/reducer/modalRducer';
import { setUser } from '../stores/reducer/userReducer';
import UserButton from './elements/UserButton';
import UserInput from './elements/UserInput';
import handleUpdateMyData from './handlers/handleUpdateMyData';
import ProfileUpload from './ProfileUpload';
import style from './styles/update.module.css';

const UpdateInfo = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState<boolean>(false);

  const user = useSelector((state: SliceOptions) => state.user);

  async function updateInfoProcess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setDisabled(true);

    const { success, message, data } = await handleUpdateMyData(event);

    const modalData: ModalState = {
      title: success ? '저장 성공' : '저장 실패',
      success: success,
      message: message,
      modalIsShow: true,
      routerType: 'back',
      type: success ? 'confirm' : 'alert',
    };

    dispatch(setModal(modalData));

    if (success) {
      dispatch(
        setUser({ ...data, path: data.profile ? data.profile?.path : '' }),
      );
    }

    setDisabled(false);
  }

  return (
    <form onSubmit={updateInfoProcess}>
      <ProfileUpload />

      <section className={style.inputWrap}>
        <UserInput
          labelValue={'아이디'}
          name={'account'}
          type={'text'}
          value={user?.account}
          placeholder={' '}
          readOnly={true}
        />
        <UserInput
          labelValue={'연락처'}
          name={'phone'}
          type={'text'}
          value={user?.phone}
          placeholder={' '}
        />
        <UserInput
          labelValue={'이메일'}
          name={'email'}
          type={'email'}
          value={user?.email}
          placeholder={' '}
        />
        <UserInput
          labelValue={'소속'}
          name={'community'}
          type={'text'}
          value={user?.community}
          placeholder={' '}
        />
      </section>
      <section className={style.buttonWrap}>
        <UserButton
          type={'submit'}
          value={'저장'}
          className={style.button}
          disabled={disabled}
        />
        <UserButton
          type={'button'}
          value={'취소'}
          className={style.button}
          onClick={() => router.back()}
          disabled={disabled}
        />
      </section>
    </form>
  );
};

export default UpdateInfo;
