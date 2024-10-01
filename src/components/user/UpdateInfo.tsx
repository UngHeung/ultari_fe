import ImageUploadForm from '../post/ImageUploadForm';
import { UserState } from '../stores/interfaces/stateInterface';
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
  return (
    <form>
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
          labelValue={'비밀번호'}
          name={'password'}
          type={'password'}
          placeholder={' '}
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
    </form>
  );
};

export default UpdateInfo;
