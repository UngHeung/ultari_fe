import { authAxios } from '@/apis/axiosAuth';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { SliceOptions, UserState } from '../stores/interfaces/stateInterface';
import UserButton from './elements/UserButton';
import UserInput from './elements/UserInput';
import ProfileUpload from './ProfileUpload';
import style from './styles/update.module.css';

const UpdateInfo = ({
  user,
}: {
  user:
    | Pick<UserState, 'account' | 'phone' | 'email' | 'community' | 'profile'>
    | undefined;
}) => {
  const router = useRouter();
  const userId = useSelector((state: SliceOptions) => state.user.id);

  async function updateInfoProcess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const file = formData.get('profile');
    const data = {
      profile: '',
      phone: formData.get('phone') || '',
      email: formData.get('email') || '',
      community: formData.get('community') || '',
    };

    try {
      const response = await authAxios.post('/common/image', { image: file });

      data.profile = response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data.message || '서버에 문제 발생',
      };
    }

    try {
      const response = await authAxios.patch(`/user/${userId}`, data);

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data.message || '서버에 문제 발생',
      };
    }
  }

  return (
    <form onSubmit={updateInfoProcess}>
      <ProfileUpload currentProfile={user?.profile} />

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
        <UserButton type={'submit'} value={'저장'} className={style.button} />
        <UserButton
          type={'button'}
          value={'취소'}
          className={style.button}
          onClick={() => router.back()}
        />
      </section>
    </form>
  );
};

export default UpdateInfo;
