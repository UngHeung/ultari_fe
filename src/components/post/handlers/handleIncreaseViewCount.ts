import { authAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';

async function handleIncreaseViewCount(id: number) {
  try {
    const response = await authAxios.patch(`/post/${id}/views`);

    return makeResponseResult(response);
  } catch (error: any) {
    return makeResponseResult(error);
  }
}

export default handleIncreaseViewCount;
