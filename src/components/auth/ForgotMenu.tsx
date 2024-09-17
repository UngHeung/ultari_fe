import Link from 'next/link';

const ForgotMenu = () => {
  return (
    <>
      <menu>
        <ul>
          <li>
            <Link href={'/forgot/password'}>비밀번호 찾기</Link>
          </li>
          <li>
            <Link href={'/forgot/account'}>아이디 찾기</Link>
          </li>
        </ul>
      </menu>
    </>
  );
};

export default ForgotMenu;
