import { authAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import axios from 'axios';

export async function verifiedPassword(data: { password: string }) {
  try {
    const response = await authAxios.post('/auth/verify', data);

    console.log(response);

    return makeResponseResult(response);
  } catch (error: any) {
    return makeResponseResult(error);
  }
}
