'use client';

import style from './layout.module.css';
import { usePathname } from 'next/navigation';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = usePathname();
  const title = getTitle(router);

  return (
    <>
      <section className={style.authWrap}>
        <h2>{title}</h2>
        {children}
      </section>
    </>
  );
};

export const getTitle = (router: string) => {
  const type = router.slice(1);

  if (type === 'sign') {
    return '회원가입';
  } else if (type === 'login') {
    return '로그인';
  } else if (type === 'forgot') {
    return '비밀번호 찾기';
  }
};

export default AuthLayout;
