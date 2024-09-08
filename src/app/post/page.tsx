'use client';

import { authAxios } from '@/apis/axiosAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = () => {
  const router = useRouter();
  const [postList, setPostList] = useState<any>([]);

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

  const getPosts = async () => {
    const response = await authAxios.get('http://localhost:3000/post');
    const posts = response.data.data;
    return posts as any[];
  };

  return (
    <div>
      {postList?.length ? (
        postList.map((post: any, idx: number) => {
          return <li key={idx}>{post.title}</li>;
        })
      ) : (
        <li>{'게시물이 없습니다.'}</li>
      )}
    </div>
  );
};

export default page;
