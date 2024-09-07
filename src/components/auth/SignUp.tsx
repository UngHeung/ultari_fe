import AuthInput from './AuthInput';
import BaseButton from '../common/BaseButton';
import style from './styles/button.module.css';
import { useRouter } from 'next/navigation';
import { handleSignUp } from './handlers/hendleSignUp';

const SignUp = () => {
  const router = useRouter();

  return (
    <form onSubmit={handleSignUp}>
      <AuthInput
        name={'account'}
        id={'auth_account'}
        type={'text'}
        labelValue={'아이디'}
        placeholder={' '}
      />
      <AuthInput
        name={'password'}
        id={'auth_password'}
        type={'password'}
        labelValue={'비밀번호'}
        placeholder={' '}
      />
      <AuthInput
        name={'password_check'}
        id={'auth_password_check'}
        type={'password'}
        labelValue={'비밀번호 확인'}
        placeholder={' '}
      />
      <AuthInput
        name={'name'}
        id={'auth_name'}
        type={'text'}
        labelValue={'이름'}
        placeholder={' '}
      />
      <AuthInput
        name={'phone'}
        id={'auth_phone'}
        type={'text'}
        labelValue={'핸드폰번호'}
        placeholder={' '}
      />
      <AuthInput
        name={'email'}
        id={'auth_email'}
        type={'email'}
        labelValue={'이메일'}
        placeholder={' '}
      />

      <div className={style.buttonWrap}>
        <BaseButton
          styleClass={style.authButton}
          type={'submit'}
          value={'가입하기'}
        />
        <BaseButton
          styleClass={style.authButton}
          type={'button'}
          value={'취소'}
          onClick={() => router.back()}
        />
      </div>
    </form>
  );
};

export default SignUp;
