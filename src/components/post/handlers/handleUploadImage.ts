import { fileUploadAxios } from '@/apis/axiosUploadFile';
import axios from 'axios';

const handleUploadImage = async (files: File[]) => {
  const formData = new FormData();

  if (files.length > 6) {
    return {
      status: 400,
      success: false,
      message: '이미지는 최대 5장 까지만 업로드할 수 있습니다.',
    };
  }

  for (let i = 0; i < files.length; i++) {
    formData.append(`images`, files[i]);
  }

  try {
    const url = `/common/images`;
    const response = await fileUploadAxios.post(url, formData);

    return {
      data: response.data,
      status: response.status,
      success: true,
      message: `이미지 등록 성공!`,
    };
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

export default handleUploadImage;
