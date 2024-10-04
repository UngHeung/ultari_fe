import { authAxios } from '@/apis/axiosAuth';
import { BASE_URL } from '@/components/common/constants/pathConst';
import { FormEvent } from 'react';
import { PostWriteTypes } from '../interfaces/postInterfaces';

const handleUploadPost = async (
  event: FormEvent<HTMLFormElement>,
  type: PostWriteTypes,
  images?: string[],
  updatePostId?: number,
) => {
  const formData = new FormData(event.currentTarget);
  const title = formData.get('title');
  const content = formData.get('content');
  const visibility = formData.get('visibility');
  const contentType = formData.get('contentType');
  const data = { title, content, images, visibility, contentType };
  const url = `post/${type === 'update' ? updatePostId : ''}`;

  try {
    const response: any =
      type === 'new'
        ? await authAxios.post(url, data)
        : await authAxios.patch(url, data);

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

export default handleUploadPost;
