import { authAxios } from '@/apis/axiosAuth';
import { getPostOptions } from '../interfaces/postInterfaces';
import axios from 'axios';

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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.status,
        success: false,
      };
    } else {
      return {
        status: 500,
        success: false,
      };
    }
  }
}

export default handleGetPostList;
