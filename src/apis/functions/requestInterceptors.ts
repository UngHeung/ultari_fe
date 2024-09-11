import { ACCESS_TOKEN } from '@/components/auth/constants/accessToken';
import axios, { AxiosInstance } from 'axios';
import { reissueAccessToken } from './reissueToken';

const requestInterceptors = async (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
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
};

export default requestInterceptors;
