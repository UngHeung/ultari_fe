'use client';

import React, { useEffect, useState } from 'react';
import { getPosts } from '@/components/post/functions/getPosts';
import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { useRouter } from 'next/navigation';
import PostList from '@/components/post/PostList';

const post = () => {
  const router = useRouter();
  const [postList, setPostList] = useState<PostOptions[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setPostList(await getPosts());
      } catch (error: any) {
        if (error.status === 401) {
          router.push('/login');
        } else {
          console.log('Post page error : ', error.message);
        }
      }
    })();
  }, []);

  return (
    <>
      <PostList posts={postList} />
    </>
  );
};

export default post;
