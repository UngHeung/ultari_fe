import { authAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';

async function handleGetPost(id: number) {
  try {
    const response = await authAxios.get(`/post/${id}`);

    return makeResponseResult(response);
  } catch (error: any) {
    return makeResponseResult(error);
  }
}

export default handleGetPost;
