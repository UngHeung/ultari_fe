import Link from 'next/link';
import React from 'react';

const ForgotPassword = () => {
  return (
    <div>
      <Link href={'/forgot/account'}>아이디 찾기</Link>
      <Link href={'/forgot/password'}>비밀번호 찾기</Link>
    </div>
  );
};

export default ForgotPassword;
