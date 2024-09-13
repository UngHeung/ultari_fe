import { refreshToken } from '@/components/auth/functions/refreshToken';
import {
  getAccessToken,
  getRefreshToken,
} from '@/components/auth/functions/tokenInteract';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { authAxios } from '../axiosAuth';

/**
 * @param config
 * @param isAccess
 * access : true
 * refresh : false
 */
export const callbackRequestConfig = (
  config: InternalAxiosRequestConfig,
  isAccess: boolean,
) => {
  if (isAccess) {
    const accessToken = getAccessToken();
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  } else {
    const refreshToken = getRefreshToken();
    config.headers['Authorization'] = `Bearer ${refreshToken}`;
  }

  return config;
};

export const callbackRequestError = (error: any) => {
  return Promise.reject(error);
};

export const callbackResponse = (response: AxiosResponse) => {
  if (response.status === 404) {
    console.log('404 page');
  }

  return response;
};

export const callbackResponseError = async (error: any, isAccess: boolean) => {
  if (error.response?.status === 401) {
    try {
      const refreshTokenResponse = await refreshToken(isAccess);

      if (!refreshTokenResponse.success) {
        return refreshTokenResponse;
      }

      error.config.header = {
        Authorization: `Bearer ${isAccess ? getAccessToken() : getRefreshToken()}`,
      };

      const response = await authAxios.request(error.config);

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};
