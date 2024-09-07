import axios from 'axios';
import { BASE_URL } from '@/components/common/constants/pathConst';
import { reissueAccessToken } from './functions/reissueToken';
import { requestInterceptors } from './functions/requestInterceptors';
import { responseInterceptors } from './functions/responseInterceptors';

export const authAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

(async () => {
  await requestInterceptors(authAxios);
  await responseInterceptors(authAxios);
})();
