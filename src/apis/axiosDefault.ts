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
    config.url = `${process.env.NEXT_PUBLIC_DB_HOST}${config.url}`;
  }

  return config;
}
