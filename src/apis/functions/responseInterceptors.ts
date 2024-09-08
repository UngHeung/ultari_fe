import { ACCESS_TOKEN } from '@/components/auth/constants/accessToken';
import { AxiosInstance } from 'axios';

const responseInterceptors = async (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    config => {
      const accessToken = ACCESS_TOKEN.accessToken;

      config.headers['Authorization'] = `Bearer ${accessToken}`;

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
};

export default responseInterceptors;
