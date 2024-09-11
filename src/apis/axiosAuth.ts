import { BASE_URL } from '@/components/common/constants/pathConst';
import axios from 'axios';
import {
  callbackRequestConfig,
  callbackRequestError,
  callbackResponse,
  callbackResponseError,
} from './functions/axiosInterceptorCallbacks';

export const authAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

authAxios.interceptors.request.use(
  config => callbackRequestConfig(config, true),
  error => callbackRequestError(error),
);

authAxios.interceptors.response.use(
  response => callbackResponse(response),
  async error => callbackResponseError(error),
);
