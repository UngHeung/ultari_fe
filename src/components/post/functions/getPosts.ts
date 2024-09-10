import { authAxios } from '@/apis/axiosAuth';

export const getPosts = async () => {
  const response = await authAxios.get('http://localhost:3000/post');
  const posts = response.data.data;
  return posts as any[];
};
