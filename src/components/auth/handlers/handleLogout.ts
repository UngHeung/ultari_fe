import axios from 'axios';
import { ACCESS_TOKEN } from '../constants/accessToken';
import { BASE_URL, LOGOUT_PATH } from '@/components/common/constants/pathConst';

const handleLogout = async () => {
  const url = `${BASE_URL}/${LOGOUT_PATH}`;

  try {
    ACCESS_TOKEN.accessToken = '';
    localStorage.clear();

    const response = await axios.post(url, {
      headers: {},
    });

    return {
      status: response.status,
      success: true,
      message: '로그아웃 완료',
    };
  } catch (error: any) {
    return {
      status: error.status,
      success: false,
      message: `로그아웃 실패\n${error.response.data.message}`,
    };
  }
};

export default handleLogout;