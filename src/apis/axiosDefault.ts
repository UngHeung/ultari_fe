import { BASE_URL } from '@/components/common/constants/pathConst';
import axios from 'axios';

export const defulatAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
