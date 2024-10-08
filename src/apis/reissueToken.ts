import {
  REISSUE_ACCESS,
  REISSUE_REFRESH,
} from '@/components/common/constants/pathConst';
import { refreshAxios } from './axiosInstance';

const accessReissueUrl = REISSUE_ACCESS;
const refreshReissueUrl = REISSUE_REFRESH;

/**
 * Reissue access token
 */
export const reissueAccessToken = async () => {
  const response = await refreshAxios.post(accessReissueUrl);
  const accessToken = response.data.accessToken;
  return accessToken;
};

/**
 * Reissue refresh token
 */
export const reissueRefreshToken = async () => {
  const response = await refreshAxios.post(refreshReissueUrl);
  const refreshToken = response.data.refreshToken;
  return refreshToken;
};
