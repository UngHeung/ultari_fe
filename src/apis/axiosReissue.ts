import axios from 'axios';
import {
  callbackRequestConfig,
  callbackRequestError,
} from './functions/axiosInterceptorCallbacks';

export const refreshAxios = axios.create({
  withCredentials: true,
});

refreshAxios.interceptors.request.use(
  config => callbackRequestConfig(config, false),
  error => callbackRequestError(error),
);
