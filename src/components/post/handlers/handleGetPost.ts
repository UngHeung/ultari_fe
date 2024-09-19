import { authAxios } from '@/apis/axiosAuth';
import { BASE_URL } from '@/components/common/constants/pathConst';

async function handleGetPost(id: number) {
  const url = `${BASE_URL}/post/${id}`;

  try {
    const response = await authAxios.get(url);
    return response.data;
  } catch (error: any) {
    console.log(error.response?.data?.message || '서버에 문제 발생');
  }
}

export default handleGetPost;
