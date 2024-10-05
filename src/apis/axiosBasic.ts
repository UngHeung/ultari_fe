import axios from 'axios';

export const axiosBasic = axios.create({
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});
