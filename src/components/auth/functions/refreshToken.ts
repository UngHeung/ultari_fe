import {
  reissueAccessToken,
  reissueRefreshToken,
} from '@/apis/functions/reissueToken';
import { setAccessToken, setRefreshToken } from './tokenInteract';

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
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

export default refreshToken;
