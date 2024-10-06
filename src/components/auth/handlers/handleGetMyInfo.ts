import { authAxios } from '@/apis/axiosAuth';
import { MY_INFO } from '@/components/common/constants/pathConst';

const handleGetMyInfo = async (type?: 'team' | 'post' | 'all') => {
  let query = '';

  if (type) {
    query =
      type === 'team' ? '/team' : type === 'post' ? '/post' : '/team-and-post';
  }

  const url = MY_INFO + query;

  try {
    const response = await authAxios.get(url);

    return {
      status: response.status,
      success: true,
      message: '내 정보를 불러왔습니다.',
      data: response?.data,
    };
  } catch (error: any) {
    return {
      status: error.status,
      success: false,
      message: error.response?.data.message ?? '서버에 문제 발생',
    };
  }
};

export default handleGetMyInfo;
