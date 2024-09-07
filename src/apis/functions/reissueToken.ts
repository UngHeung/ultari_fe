import {
  BASE_URL,
  REISSUE_ACCESS,
  REISSUE_REFRESH,
} from '@/components/common/constants/pathConst';
import { refreshAxios } from '../axiosReissue';

const accessReissueUrl = `${BASE_URL}/${REISSUE_ACCESS}`;
const refreshReissueUrl = `${BASE_URL}/${REISSUE_REFRESH}`;

export const reissueAccessToken = async () => {
  const response = await refreshAxios.post(accessReissueUrl);
  const accessToken = response.data.accessToken;
  return accessToken;
};

export const reissueRefreshToken = async () => {
  const response = await refreshAxios.post(refreshReissueUrl);
  const refreshToken = response.data.refreshToken;
  return refreshToken;
};
