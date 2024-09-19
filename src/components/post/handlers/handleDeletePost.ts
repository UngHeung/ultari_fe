import { authAxios } from '@/apis/axiosAuth';
import { BASE_URL, POST_BASIC } from '@/components/common/constants/pathConst';

const handleDeletePost = async (postId: number) => {
  try {
    const response = await authAxios.delete(
      `${BASE_URL}/${POST_BASIC}/${postId}`,
    );

    return {
      status: response.status,
      success: true,
      message: '게시물 삭제 완료',
    };
  } catch (error: any) {
    return {
      status: error.status,
      success: true,
      message: error.response.data.message,
    };
  }
};

export default handleDeletePost;
