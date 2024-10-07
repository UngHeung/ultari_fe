import { defaultAxios } from '@/apis/axiosDefault';
import { ACCESS_TOKEN } from '../constants/accessToken';

const handleLogout = async () => {
  try {
    const response = await defaultAxios.post('/auth/logout');

    ACCESS_TOKEN.accessToken = response.data.accessToken;
    localStorage.setItem('refreshToken', response.data.refreshToken);

    return {
      success: true,
      message: '로그아웃 완료',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data.message || '서버에 문제 발생',
    };
  }
};

export default handleLogout;
