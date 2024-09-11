import { ACCESS_TOKEN } from '../constants/accessToken';

export const setAccessToken = (token: string) => {
  ACCESS_TOKEN.accessToken = token;
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem('refreshToken', token);
};

export const getAccessToken = () => {
  return ACCESS_TOKEN.accessToken;
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};
