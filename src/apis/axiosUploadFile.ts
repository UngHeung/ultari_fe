import axios from 'axios';
import { BASE_URL } from '@/components/common/constants/pathConst';
import { requestInterceptors } from './functions/requestInterceptors';
import { responseInterceptors } from './functions/responseInterceptors';

export const fileUploadAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

(async () => {
  await requestInterceptors(fileUploadAxios);
  await responseInterceptors(fileUploadAxios);
})();
