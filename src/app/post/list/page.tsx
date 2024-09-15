'use client';

import PostList from '@/components/post/PostList';
import { getPosts } from '@/components/post/functions/getPosts';
import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const listPage = () => {
  const router = useRouter();
  const [postList, setPostList] = useState<PostOptions[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [findOptions, setFindOptions] = useState<string>('');

  useEffect(() => {
    getPostsProcess(
      findOptions,
      setPostList,
      currentPath,
      setCurrentPath,
      router,
    );
  }, [findOptions]);

  return (
    <>
      <ul>
        <button
          onClick={() => {
            setFindOptions('order__createAt=DESC');
          }}
        >
          최신순
        </button>{' '}
        |{' '}
        <button
          onClick={() => {
            setFindOptions('order__createAt=ASC');
          }}
        >
          과거순
        </button>
      </ul>
      <PostList posts={postList} />
    </>
  );
};

async function getPostsProcess(
  findOptions: string,
  setPostList: React.Dispatch<React.SetStateAction<PostOptions[]>>,
  currentPath: string,
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>,
  router: AppRouterInstance,
) {
  try {
    const { data, next } = await getPosts(findOptions, currentPath);

    setCurrentPath(next);
    setPostList(data);
  } catch (error: any) {
    if (error.status === 401) {
      router.push('/login');
    }
  }
}

export default listPage;
