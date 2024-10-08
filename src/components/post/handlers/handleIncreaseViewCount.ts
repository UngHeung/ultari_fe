import { authAxios } from '@/apis/axiosInstance';
import { POST_INCREASE_VIEWS } from '@/components/common/constants/pathConst';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import axios from 'axios';

async function handleIncreaseViewCount(id: number) {
  try {
    const response = await authAxios.patch(
      `/post/${id}/${POST_INCREASE_VIEWS}`,
    );

    return makeResponseResult(response);
  } catch (error: any) {
    return makeResponseResult(error);
  }
}

export default handleIncreaseViewCount;
