import { baseAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';

async function handleGetPostList(url: string) {
  try {
    const response = await baseAxios.get(url);

    return makeResponseResult(response);
  } catch (error: any) {
    return makeResponseResult(error);
  }
}

export default handleGetPostList;
