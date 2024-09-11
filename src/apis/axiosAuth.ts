import axios from 'axios';
import { BASE_URL } from '@/components/common/constants/pathConst';
import { getAccessToken } from '@/components/auth/functions/tokenInteract';
import { reissueToken } from '@/components/auth/functions/reissueToken';

export const authAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

authAxios.interceptors.request.use(
  config => {
    const accessToken = getAccessToken();
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

authAxios.interceptors.response.use(
  response => {
    if (response.status === 404) {
      console.log('404 Page');
    }

    return response;
  },
  async error => {
    if (error.response?.status === 401) {
      try {
        await reissueToken(true);
      } catch (error: any) {
        return Promise.reject(error);
      }

      error.config.headers = {
        Authorization: `Bearer ${getAccessToken()}`,
      };

      const response = await axios.request(error.config);
      return response;
    }
    return Promise.reject(error);
  },
);
