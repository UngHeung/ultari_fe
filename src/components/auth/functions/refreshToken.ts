import { reissueAccessToken, reissueRefreshToken } from '@/apis/reissueToken';
import { setAccessToken, setRefreshToken } from './tokenInteract';
import axios from 'axios';

/**
 * @param isAccess
 * access token : true
 * refresh token : false
 */
const refreshToken = async (isAccess: boolean) => {
  try {
    if (isAccess) {
      const newAccessToken = await reissueAccessToken();
      setAccessToken(newAccessToken);
    } else {
      const newRefreshToken = await reissueRefreshToken();
      setRefreshToken(newRefreshToken);
    }

    return {
      success: true,
      message: '새로운 토큰 발급이 완료되었습니다.',
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data.message || '서버에 문제 발생',
      };
    } else {
      return {
        success: false,
        message: '서버에 문제 발생',
      };
    }
  }
};

export default refreshToken;
