'use client';

import Link from 'next/link';
import style from './layout.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SliceOptions } from '@/components/stores/constants/stateOptions';

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.user?.isLoggedIn ?? false,
  );
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      const type = pathname.slice(1).split('/')[1];
      if (type === 'list') {
        setTitle('게시물 목록');
      } else if (type === 'write') {
        setTitle('게시물 작성');
      } else if (type === 'update') {
        setTitle('게시물 수정');
      } else {
        setTitle('게시물');
      }
    }
  });

  return (
    <>
      <section className={style.postWrap}>
        <h2 className={style.postTitle}>{title}</h2>
        {children}
      </section>
      <section className={style.buttonWrap}>
        {!title.endsWith('목록') && <Link href={'/post/list'}>목록</Link>}
        {title.endsWith('수정') && <Link href={'/post/update'}>수정</Link>}
        {!title.endsWith('작성') && <Link href={'/post/write'}>글쓰기</Link>}
      </section>
    </>
  );
};

export default PostLayout;
