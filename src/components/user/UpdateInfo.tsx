import { authAxios } from '@/apis/axiosAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../common/constants/pathConst';
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

  return (
    <form
      onSubmit={async event => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const file = formData.get('profile');

        const data = {
          profile: '',
          phone: formData.get('phone') || '',
          email: formData.get('email') || '',
          community: formData.get('community') || '',
        };

        const imageUrl = `${BASE_URL}/common/image`;

        try {
          const response = await authAxios.post(imageUrl, { image: file });

          data.profile = response.data;
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

        const url = `${BASE_URL}/user/${userId}`;

        console.log(data);

        try {
          const response = await authAxios.patch(url, data);

          return {
            status: response.status,
            success: true,
            data: response.data,
          };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            return {
              status: error.status,
              success: false,
              message: error.response?.data.message || '서버에 문제 발생',
            };
          }
        }
      }}
    >
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
