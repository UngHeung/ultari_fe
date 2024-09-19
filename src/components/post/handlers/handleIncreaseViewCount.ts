import { authAxios } from '@/apis/axiosAuth';
import {
  BASE_URL,
  POST_INCREASE_VIEWS,
} from '@/components/common/constants/pathConst';

async function handleIncreaseViewCount(id: number) {
  const url = `${BASE_URL}/post/${id}/${POST_INCREASE_VIEWS}`;
  try {
    await authAxios.patch(url);
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

export default handleIncreaseViewCount;
