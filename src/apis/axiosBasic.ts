import axios from 'axios';
import { BASE_URL } from '@/components/common/constants/pathConst';

export const axiosBasic = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});
