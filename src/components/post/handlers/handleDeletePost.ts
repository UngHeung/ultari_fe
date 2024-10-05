import { authAxios } from '@/apis/axiosAuth';
import { POST_BASIC } from '@/components/common/constants/pathConst';

const handleDeletePost = async (postId: number) => {
  const url = `${POST_BASIC}/${postId}`;

  try {
    const response = await authAxios.delete(url);

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
