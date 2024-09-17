import { authAxios } from '@/apis/axiosAuth';
import { BASE_URL } from '@/components/common/constants/pathConst';
import { FormEvent } from 'react';
import { PostWriteTypes } from '../Write';

export const handleUploadPost = async (
  event: FormEvent<HTMLFormElement>,
  type: PostWriteTypes,
  updatePostId?: number,
) => {
  const formData = new FormData(event.currentTarget);
  const title = formData.get('title');
  const content = formData.get('content');
  const data = { title, content };
  const url = `${BASE_URL}/post/${type === 'update' ? updatePostId : ''}`;

  console.log('post id : ', updatePostId);
  console.log('url : ', url);

  try {
    const response: any =
      type === 'new'
        ? await authAxios.post(url, data)
        : await authAxios.patch(url, data);

    console.log(response);

    if (Math.round(response.status / 100) === 2) {
      return {
        data: response.data,
        status: response.status,
        success: true,
        message: `게시물 ${type === 'new' ? '등록' : '수정'} 성공!`,
      };
    } else {
      return {
        status: response.status,
        success: false,
        message: response.message,
      };
    }
  } catch (error: any) {
    return {
      status: error.status,
      success: false,
      message: error.response.data.message,
    };
  }
};
