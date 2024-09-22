import { authAxios } from '@/apis/axiosAuth';
import { getPostOptions } from '../interfaces/postInterfaces';

async function handleGetPostList(url: string) {
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
