'use client';

import { SliceOptions } from '@/components/stores/interfaces/stateInterface';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './layout.module.css';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [title, setTitle] = useState<string>('');

  const isLoggedIn = useSelector(
    (state: SliceOptions) => state?.user?.isLoggedIn ?? false,
  );

  useEffect(() => {
    const type = pathname.slice(1);

    if (type === 'sign') {
      setTitle('회원 가입');
    } else if (type === 'login') {
      setTitle('로그인');
    } else if (type === 'forgot/account') {
      setTitle('아이디 찾기');
    } else if (type === 'forgot/password') {
      setTitle('비밀번호 찾기');
    }
  }, [pathname, isLoggedIn]);

  return (
    <>
      <section className={style.authWrap}>
        <h2 className={style.authTitle}>{title}</h2>
        {children}
      </section>
    </>
  );
};

export default AuthLayout;
