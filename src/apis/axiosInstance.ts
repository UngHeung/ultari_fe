import axios from 'axios';
import {
  callbackRequestConfig,
  callbackRequestError,
  callbackResponse,
  callbackResponseError,
} from './axiosInterceptorCallbacks';

/**
 * 권한이 필요없는 Axios 인스턴스
 */
export const baseAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DB_HOST,
});

/**
 * 권한이 필요한 Axios 인스턴스
 */
export const authAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

baseAxios.interceptors.request.use(
  config => callbackRequestConfig(config, true),
  error => callbackRequestError(error),
);

baseAxios.interceptors.response.use(
  response => callbackResponse(response),
  error => callbackResponseError(error, true),
);

/**
 * 권한이 필요한 파일 업로드용 Axios
 */
export const fileUploadAxios = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

fileUploadAxios.interceptors.request.use(
  config => callbackRequestConfig(config, true),
  error => callbackRequestError(error),
);

fileUploadAxios.interceptors.response.use(
  response => callbackResponse(response),
  error => callbackResponseError(error, true),
);

/**
 * 토큰 재발급용 Axios
 */
export const refreshAxios = axios.create({
  withCredentials: true,
});

refreshAxios.interceptors.request.use(
  config => callbackRequestConfig(config, false),
  error => callbackRequestError(error),
);
