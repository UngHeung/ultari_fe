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
      <footer>
        <Link href={'/post/list'}>목록</Link>
        <Link href={'/post/write'}>글쓰기</Link>
      </footer>
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
