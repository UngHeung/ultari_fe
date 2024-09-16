import { authAxios } from '@/apis/axiosAuth';
import { BASE_URL } from '@/components/common/constants/pathConst';
import { FormEvent } from 'react';

export const handleUploadPost = async (event: FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);
  const title = formData.get('title');
  const content = formData.get('content');
  const data = { title, content };
  const url = `${BASE_URL}/post`;

  try {
    const response: any = await authAxios.post(url, data);

    if (response.status === 201) {
      return {
        data: response.data,
        status: response.status,
        success: true,
        message: '게시물 등록 성공!',
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
