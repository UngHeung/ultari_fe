'use client';

import Link from 'next/link';
import style from './layout.module.css';
import { usePathname } from 'next/navigation';

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  const router = usePathname();
  const title = getTitle(router);

  return (
    <>
      <section className={style.postWrap}>
        <h2 className={style.postTitle}>{title}</h2>
        {children}
      </section>
      <section className={style.buttonWrap}>
        {title.endsWith('수정') && <Link href={'/post/update'}>수정</Link>}
        {!title.endsWith('목록') && <Link href={'/post/list'}>목록</Link>}
        {!title.endsWith('작성') && <Link href={'/post/write'}>글쓰기</Link>}
      </section>
    </>
  );
};

export const getTitle = (router: string) => {
  const type = router.slice(1).split('/')[1];
  console.log(router);

  if (type === 'list') {
    return '게시물 목록';
  } else if (type === 'write') {
    return '게시물 작성';
  } else if (type === 'update') {
    return '게시물 수정';
  } else {
    return '게시물';
  }
};

export default PostLayout;
