import axios from 'axios';
import { BASE_URL } from '@/components/common/constants/pathConst';
import { getRefreshToken } from '@/components/auth/functions/tokenInteract';

export const refreshAxios = axios.create({
  baseURL: BASE_URL,
});

refreshAxios.interceptors.request.use(
  config => {
    const refreshToken = getRefreshToken();
    config.headers['Authorization'] = `Bearer ${refreshToken}`;
    return config;
  },
  error => {
    console.log('axiosReissue : ', error);
    return Promise.reject(error);
  },
);
