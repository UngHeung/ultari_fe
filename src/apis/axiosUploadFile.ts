import axios from 'axios';
import {
  callbackRequestConfig,
  callbackRequestError,
  callbackResponse,
  callbackResponseError,
} from './functions/axiosInterceptorCallbacks';

export const fileUploadAxios = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    withCredentials: true,
  },
});

fileUploadAxios.interceptors.request.use(
  config => callbackRequestConfig(config, true),
  error => callbackRequestError(error),
);

fileUploadAxios.interceptors.response.use(
  response => callbackResponse(response),
  async error => callbackResponseError(error, true),
);
