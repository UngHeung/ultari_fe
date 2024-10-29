import { fileUploadAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';

const handleUploadImage = async (files: File[]) => {
  const formData = new FormData();

  if (!files || files.length <= 0) {
    return {
      success: false,
      message: '이미지를 등록해주세요.',
      data: null,
    };
  }

  if (files?.length > 3) {
    return {
      success: false,
      message: '최대 3장의 이미지를 업로드할 수 있습니다.',
      data: null,
    };
  }

  for (const file of files) {
    if (file.size > 2 * 1024 * 1024) {
      return {
        success: false,
        message: '업로드 가능한 이미지 최대 용량은 2Mb 입니다.',
        data: null,
      };
    }
  }

  for (let i = 0; i < files.length; i++) {
    formData.append(`images`, files[i]);
  }

  try {
    const response = await fileUploadAxios.post('/post/images', formData);

    return makeResponseResult(response, '이미지 등록');
  } catch (error: any) {
    return makeResponseResult(error);
  }
};

export default handleUploadImage;
