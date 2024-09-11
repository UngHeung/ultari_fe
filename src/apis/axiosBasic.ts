import { BASE_URL } from '@/components/common/constants/pathConst';
import axios from 'axios';

export const axiosBasic = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});
