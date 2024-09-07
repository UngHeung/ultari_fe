import { AxiosInstance } from 'axios';

export const responseInterceptors = async (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    config => {
      const accessToken = localStorage.getItem('accessToken');

      config.headers['Authorization'] = `Bearer ${accessToken}`;

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
};
