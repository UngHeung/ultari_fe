import { authAxios } from '@/apis/axiosAuth';
import { BASE_URL } from '@/components/common/constants/pathConst';

const handleGetPosts = async (
  findOptions: string,
  path: string,
  orderBy: boolean,
) => {
  let url = '';

  if (findOptions.length) {
    url = `${BASE_URL}/post?${findOptions}&order__createAt=${orderBy ? 'ASC' : 'DESC'}`;
  } else {
    url = path.length
      ? path
      : `${BASE_URL}/post?order__createAt=${orderBy ? 'ASC' : 'DESC'}`;
  }

  const response = await authAxios.get(url);

  return {
    data: response.data.data,
    next: response.data.next,
  };
};

export default handleGetPosts;
