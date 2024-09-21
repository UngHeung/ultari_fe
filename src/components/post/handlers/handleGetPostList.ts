import { authAxios } from '@/apis/axiosAuth';
import { BASE_URL } from '@/components/common/constants/pathConst';
import { OrderTypes } from '@/components/stores/constants/stateOptions';
import { getPostOptions } from '../interfaces/postInterfaces';

async function handleGetPostList(orderBy?: OrderTypes, findOptions?: string) {
  let url = '';

  if (!findOptions?.length) {
    url = `${BASE_URL}/post?order__createAt=${orderBy ?? 'DESC'}`;
  } else {
    url = `${BASE_URL}/post?${findOptions}`;
  }

  try {
    const response = await authAxios.get(url);

    return {
      status: response.status,
      success: true,
      data: {
        postList: response.data.data,
        cursor: response.data.cursor,
        count: response.data.count,
        nextPath: response.data.next,
      } as getPostOptions,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: error.status,
      success: false,
    };
  }
}

export default handleGetPostList;
