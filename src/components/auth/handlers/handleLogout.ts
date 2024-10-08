import { baseAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { ACCESS_TOKEN } from '../constants/accessToken';

const handleLogout = async () => {
  try {
    const response = await baseAxios.post('/auth/logout');

    ACCESS_TOKEN.accessToken = response.data.accessToken;
    localStorage.setItem('refreshToken', response.data.refreshToken);

    return makeResponseResult(response, '로그아웃');
  } catch (error: any) {
    return makeResponseResult(error);
  }
};

export default handleLogout;
