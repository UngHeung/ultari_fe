import { authAxios } from '@/apis/axiosAuth';
import { POST_INCREASE_VIEWS } from '@/components/common/constants/pathConst';
import axios from 'axios';

async function handleIncreaseViewCount(id: number) {
  const url = `/post/${id}/${POST_INCREASE_VIEWS}`;
  try {
    await authAxios.patch(url);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
}

export default handleIncreaseViewCount;
