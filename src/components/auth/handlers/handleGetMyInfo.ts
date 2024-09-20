import { authAxios } from '@/apis/axiosAuth';
import { BASE_URL, MY_INFO } from '@/components/common/constants/pathConst';

const handleGetMyInfo = async () => {
  try {
    const response = await authAxios.get(`${BASE_URL}/${MY_INFO}`);
    return {
      status: response.status,
      success: true,
      message: '내 정보를 불러왔습니다.',
      data: response?.data,
    };
  } catch (error: any) {
    return {
      status: error?.status,
      success: false,
      message: error?.response.data.message,
    };
  }
};

export default handleGetMyInfo;