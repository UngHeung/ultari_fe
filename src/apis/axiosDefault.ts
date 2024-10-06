import axios, { InternalAxiosRequestConfig } from 'axios';

export const defaultAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

defaultAxios.interceptors.request.use(config => defaultCallback(config));

function defaultCallback(config: InternalAxiosRequestConfig) {
  if (!config.url?.startsWith('http')) {
    config.url = 'http://localhost:3000' + config.url;
  }

  return config;
}
