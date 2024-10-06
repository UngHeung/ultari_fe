import { authAxios } from '@/apis/axiosAuth';
import { POST_BASIC } from '@/components/common/constants/pathConst';
import axios from 'axios';

const handleDeletePost = async (postId: number) => {
  const url = `${POST_BASIC}/${postId}`;

  try {
    const response = await authAxios.delete(url);

    return {
      status: response.status,
      success: true,
      message: '게시물 삭제 완료',
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
};

export default handleDeletePost;
