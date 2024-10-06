import { authAxios } from '@/apis/axiosAuth';
import { PostState } from '@/components/stores/interfaces/stateInterface';
import axios from 'axios';

async function handleGetPost(id: number) {
  const url = `/post/${id}`;

  try {
    const response = await authAxios.get(url);

    return {
      status: response.status,
      success: true,
      data: response.data as PostState,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.status,
        success: false,
        message: error.response?.data.message || '서버에 문제 발생',
      };
    } else {
      return {
        status: 500,
        success: false,
        message: '서버에 문제 발생',
      };
    }
  }
}

export default handleGetPost;
