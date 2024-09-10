'use client';

import style from './layout.module.css';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { SliceOptions } from '@/components/stores/constants/stateOptions';
import { useEffect, useState } from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const isLoggedIn = useSelector(
    (state: SliceOptions) => state?.user?.isLoggedIn ?? false,
  );

  useEffect(() => {
    const type = pathname.slice(1);

    if (isLoggedIn) {
      if (type === 'sign') {
        router.replace('/');
      } else if (type === 'login') {
        router.replace('/');
      } else if (type === 'forgot') {
        setTitle('아이디 & 비밀번호 찾기');
      }
    } else {
      if (type === 'forgot') {
        router.replace('/login');
      } else if (type === 'sign') {
        setTitle('회원 가입');
      } else if (type === 'login') {
        setTitle('로그인');
      }
    }
  }, [pathname]);

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
