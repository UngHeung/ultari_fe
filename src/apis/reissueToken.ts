import { refreshAxios } from './axiosInstance';

const accessReissueUrl = '/auth/reissue/access';
const refreshReissueUrl = '/auth/reissue/refresh';

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
