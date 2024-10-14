import { authAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';

export async function verifiedPassword(data: { password: string }) {
  try {
    const response = await authAxios.post('/auth/verify', data);

    return makeResponseResult(response);
  } catch (error: any) {
    return makeResponseResult(error);
  }
}
