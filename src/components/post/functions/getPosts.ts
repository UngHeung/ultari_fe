import { authAxios } from '@/apis/axiosAuth';

export const getPosts = async (findOptions: string, path: string) => {
  let url = '';

  if (findOptions.length) {
    url = `http://localhost:3000/post?${findOptions}`;
  } else {
    url = path.length ? path : 'http://localhost:3000/post';
  }

  const response = await authAxios.get(url);

  return {
    data: response.data.data,
    next: response.data.next,
  };
};
