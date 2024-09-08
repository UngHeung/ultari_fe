import axios from 'axios';
import { BASE_URL } from '@/components/common/constants/pathConst';
import { ACCESS_TOKEN } from '@/components/auth/constants/accessToken';
import { reissueAccessToken } from './functions/reissueToken';

export const authAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

authAxios.interceptors.request.use(
  config => {
    const accessToken = ACCESS_TOKEN.accessToken;
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
      // isTokenExpired()
      ACCESS_TOKEN.accessToken = await reissueAccessToken();
      // isTokenExpired() && await reissueToken();
      error.config.headers = {
        Authorization: `Bearer ${ACCESS_TOKEN.accessToken}`,
      };

      const response = await axios.request(error.config);
      return response;
    }
    return Promise.reject(error);
  },
);
