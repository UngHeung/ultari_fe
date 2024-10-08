import { fileUploadAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';

const handleUploadImage = async (files: File[]) => {
  const formData = new FormData();

  if (files.length > 5) {
    return {
      success: false,
      message: '이미지는 최대 5장 까지만 업로드할 수 있습니다.',
      data: null,
    };
  }

  for (let i = 0; i < files.length; i++) {
    formData.append(`images`, files[i]);
  }

  try {
    const response = await fileUploadAxios.post('/common/images', formData);

    return makeResponseResult(response, '이미지 등록');
  } catch (error: any) {
    return makeResponseResult(error);
  }
};

export default handleUploadImage;
