import { authAxios } from '@/apis/axiosAuth';

export const getPosts = async (findOptions: string, path: string) => {
  let response;

  if (findOptions) {
    response = await authAxios.get(`http://localhost:3000/post?${findOptions}`);
  } else {
    response = await authAxios.get(path ?? 'http://localhost:3000/post');
  }
  console.log(response);
  return {
    data: response.data.data,
    next: response.data.next,
  };
};
