import { authAxios } from '@/apis/axiosAuth';
import { BASE_URL } from '@/components/common/constants/pathConst';
import { PostState } from '@/components/stores/interfaces/stateInterface';

async function handleGetPost(id: number) {
  const url = `${BASE_URL}/post/${id}`;

  try {
    const response = await authAxios.get(url);

    return {
      status: response.status,
      success: true,
      data: response.data as PostState,
    };
  } catch (error: any) {
    console.log(error.response?.data?.message || '서버에 문제 발생');
    return {
      status: error.status,
      success: false,
      message: error.response.data.message || '서버에 문제 발생',
    };
  }
}

export default handleGetPost;
