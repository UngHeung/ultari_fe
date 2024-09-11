import { refreshAxios } from '@/apis/axiosReissue';
import {
  BASE_URL,
  REISSUE_ACCESS,
  REISSUE_REFRESH,
} from '@/components/common/constants/pathConst';
import { setAccessToken, setRefreshToken } from './tokenInteract';

/**
 * @param isAccess
 * access token : true
 * refresh token : false
 */
export const reissueToken = async (isAccess: boolean) => {
  const reissuePath = isAccess ? REISSUE_ACCESS : REISSUE_REFRESH;
  const url = `${BASE_URL}/${reissuePath}`;

  try {
    const response = await refreshAxios.post(url);

    if (isAccess) {
      setAccessToken(response.data.accessToken);
    } else {
      setRefreshToken(response.data.refreshToken);
    }

    return {
      status: response.status,
      success: true,
      message: '새로운 토큰 발급이 완료되었습니다.',
    };
  } catch (error: any) {
    return {
      status: error.status,
      success: false,
      message: error.response.data.message,
    };
  }
};
