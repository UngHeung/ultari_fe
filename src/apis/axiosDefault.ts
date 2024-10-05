import axios from 'axios';

export const defaultAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});
