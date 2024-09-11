import { authAxios } from '@/apis/axiosAuth';
import { BASE_URL, MY_INFO } from '@/components/common/constants/pathConst';

export const getMyInfo = async () => {
  try {
    const response = await authAxios.get(`${BASE_URL}/${MY_INFO}`);
    return {
      status: response.status,
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: error.status,
      success: false,
      message: error.response.data.message,
    };
  }
};
