import { authAxios } from '@/apis/axiosAuth';
import { BASE_URL } from '@/components/common/constants/pathConst';

export const getPosts = async (findOptions: string, path: string) => {
  let url = '';

  console.log(findOptions);

  if (findOptions.length) {
    url = `${BASE_URL}/post?${findOptions}`;
  } else {
    url = path.length ? path : `${BASE_URL}/post?order__createAt=DESC`;
  }

  const response = await authAxios.get(url);

  return {
    data: response.data.data,
    next: response.data.next,
  };
};
