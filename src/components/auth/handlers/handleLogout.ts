import { defaultAxios } from '@/apis/axiosDefault';
import { LOGOUT_PATH } from '@/components/common/constants/pathConst';
import { ACCESS_TOKEN } from '../constants/accessToken';

const handleLogout = async () => {
  const url = LOGOUT_PATH;

  try {
    const response = await defaultAxios.post(url);

    ACCESS_TOKEN.accessToken = response.data.accessToken;
    localStorage.setItem('refreshToken', response.data.refreshToken);

    return {
      status: response.status,
      success: true,
      message: '로그아웃 완료',
    };
  } catch (error: any) {
    return {
      status: error.status,
      success: false,
      message: error.response?.data.message ?? '서버에 에러 발생',
    };
  }
};

export default handleLogout;
