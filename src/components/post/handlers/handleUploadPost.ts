import { authAxios } from '@/apis/axiosAuth';
import axios from 'axios';
import { FormEvent } from 'react';
import { PostOptions, PostWriteTypes } from '../interfaces/postInterfaces';

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
  const url = `/post?${type === 'update' ? updatePostId : ''}`;

  try {
    const response: {
      data: PostOptions;
      status: number;
      success: boolean;
      message: string;
    } =
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.status,
        success: false,
        message: error.response?.data.message || '서버에 문제 발생',
      };
    } else {
      return {
        status: 500,
        success: false,
        message: '서버에 문제 발생',
      };
    }
  }
};

export default handleUploadPost;
