import axios from 'axios';
import { BASE_URL } from '@/components/common/constants/pathConst';
import { requestInterceptors } from './functions/requestInterceptors';

export const refreshAxios = axios.create({
  baseURL: BASE_URL,
});

(async () => {
  await requestInterceptors(refreshAxios);
})();
