'use client';

import React, { useEffect, useState } from 'react';
import PostList from '@/components/post/PostList';
import { getPosts } from '@/components/post/functions/getPosts';
import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { useRouter } from 'next/navigation';

const post = () => {
  const router = useRouter();
  const [postList, setPostList] = useState<PostOptions[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [findOptions, setFindOptions] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const { data, next } = await getPosts(findOptions, currentPath);

        setCurrentPath(next);
        setPostList(data);
      } catch (error: any) {
        if (error.status === 401) {
          router.push('/login');
        } else {
          console.log('Post page error : ', error.message);
        }
      }
    })();
  }, [findOptions]);

  return (
    <>
      <PostList posts={postList} />
    </>
  );
};

export default post;
