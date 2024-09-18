'use client';

import { SliceOptions } from '@/components/stores/constants/stateOptions';
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
      !isLoggedIn ? setTitle('회원 가입') : router.back();
    } else if (type === 'login') {
      !isLoggedIn ? setTitle('로그인') : router.back();
    } else if (type === 'forgot/account') {
      isLoggedIn ? setTitle('아이디 찾기') : router.replace('/');
    } else if (type === 'forgot/password') {
      isLoggedIn ? setTitle('비밀번호 찾기') : router.replace('/');
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
