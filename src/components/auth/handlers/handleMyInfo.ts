import { authAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';

const handleMyInfo = async (type?: 'team' | 'post' | 'all') => {
  let query = '';

  if (type && type === 'team') {
    query += '/team';
  } else if (type && type === 'post') {
    query += '/post';
  } else if (type) {
    query += '/team-and-post';
  }

  try {
    const response = await authAxios.get(`/user/myinfo${query}`);

    return makeResponseResult(response);
  } catch (error: any) {
    return makeResponseResult(error);
  }
};

export default handleMyInfo;
