import { fileUploadAxios } from '@/apis/axiosUploadFile';
import { BASE_URL } from '@/components/common/constants/pathConst';

const handleUploadImage = async (files: FileList) => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append(`images`, files[i]);
  }

  try {
    const url = `${BASE_URL}/common/images`;
    const response = await fileUploadAxios.post(url, formData);

    return {
      data: response.data,
      status: response.status,
      success: true,
      message: `이미지 등록 성공!`,
    };
  } catch (error: any) {
    return {
      status: error.status,
      success: true,
      message: error.response.data.message,
    };
  }
};

export default handleUploadImage;
