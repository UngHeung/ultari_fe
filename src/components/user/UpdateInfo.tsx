import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { ModalState } from '../stores/interfaces/stateInterface';
import useModalStore, { ModalStore } from '../stores/modal/modalStore';
import useUserStore, { UserStore } from '../stores/user/userStore';
import UserButton from './elements/UserButton';
import UserInput from './elements/UserInput';
import handleUpdateMyData from './handlers/handleUpdateMyData';
import ProfileUpload from './ProfileUpload';
import style from './styles/update.module.css';
import useProfileStore, { ProfileStore } from '../stores/user/profileStore';

const UpdateInfo = () => {
  const router = useRouter();

  const [disabled, setDisabled] = useState<boolean>(false);

  const setUser = useUserStore((state: UserStore) => state.setUser);
  const user = useUserStore((state: UserStore) => state.user);
  const setProfile = useProfileStore((state: ProfileStore) => state.setPath);
  const setModal = useModalStore((state: ModalStore) => state.setModal);

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

    setModal(modalData);

    if (success) {
      setUser({ ...data, path: data.profile ? data.profile.path : '' });
      if (data.profile) {
        setProfile(data.profile.path);
      }
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
