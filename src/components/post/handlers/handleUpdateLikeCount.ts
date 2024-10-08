import { authAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';

async function handleUpdateLikeCount(postId: number) {
  try {
    const response = await authAxios.patch(`/post/${postId}/likes`);

    return makeResponseResult(response);
  } catch (error: any) {
    return makeResponseResult(error);
  }
}

export default handleUpdateLikeCount;
