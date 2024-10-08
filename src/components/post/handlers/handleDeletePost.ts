import { authAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';

const handleDeletePost = async (postId: number) => {
  try {
    const response = await authAxios.delete(`/post/${postId}`);

    return makeResponseResult(response, '게시물 삭제');
  } catch (error: any) {
    return makeResponseResult(error);
  }
};

export default handleDeletePost;
