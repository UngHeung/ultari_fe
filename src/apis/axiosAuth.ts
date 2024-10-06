import { defaultAxios } from './axiosDefault';
import {
  callbackRequestConfig,
  callbackRequestError,
  callbackResponse,
  callbackResponseError,
} from './functions/axiosInterceptorCallbacks';

export const authAxios = defaultAxios;

authAxios.interceptors.request.use(
  config => callbackRequestConfig(config, true),
  error => callbackRequestError(error),
);

authAxios.interceptors.response.use(
  response => callbackResponse(response),
  error => callbackResponseError(error, true),
);
