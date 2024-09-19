import { authAxios } from '@/apis/axiosAuth';
import { BASE_URL } from '@/components/common/constants/pathConst';
import { OrderTypes } from '@/components/stores/constants/stateOptions';

async function handleGetPostList(
  findOptions: string,
  path: string,
  orderBy: OrderTypes,
) {
  let url = '';

  if (orderBy !== 'ASC' && orderBy !== 'DESC') {
    orderBy = 'ASC';
  }

  if (findOptions.length) {
    url = `${BASE_URL}/post?${findOptions}`;
  } else {
    url = path.length ? path : `${BASE_URL}/post?order__createAt=${orderBy}`;
  }

  try {
    const response = await authAxios.get(url);

    return {
      status: response.status,
      success: true,
      data: {
        postList: response.data.data,
        nextPath: response.data.next,
      },
    };
  } catch (error: any) {
    console.log(error.response.data.message);
    return {
      status: error.status,
      success: false,
    };
  }
}

export default handleGetPostList;
