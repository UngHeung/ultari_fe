import { authAxios } from '@/apis/axiosAuth';

const handleMyInfo = async (type?: 'team' | 'post' | 'all') => {
  let url = '/user/myinfo';

  if (type && type === 'team') {
    url += '/team';
  } else if (type && type === 'post') {
    url += '/post';
  } else if (type) {
    url += '/team-and-post';
  }

  try {
    const response = await authAxios.get(url);

    return {
      success: true,
      message: '내 정보를 불러왔습니다.',
      data: response?.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data.message || '서버에 문제 발생',
    };
  }
};

export default handleMyInfo;
