import { BASE_URL } from '@/components/common/constants/pathConst';
import axios from 'axios';
import {
  callbackRequestConfig,
  callbackRequestError,
} from './functions/axiosInterceptorCallbacks';

export const refreshAxios = axios.create({
  baseURL: BASE_URL,
});

refreshAxios.interceptors.request.use(
  config => callbackRequestConfig(config, false),
  async error => await callbackRequestError(error),
);
