import { authAxios, fileUploadAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { FormEvent } from 'react';

async function handleUpdateMyData(event: FormEvent<HTMLFormElement>) {
  const formData = new FormData(event.currentTarget);

  const data = {
    profilePath: '',
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    community: formData.get('community') as string,
  };

  const file: File = formData.get('profile') as File;

  const imageFormData = new FormData();
  imageFormData.append('profile', file);

  try {
    if (file.size > 0) {
      const profileResponse = await fileUploadAxios.post(
        '/user/profile',
        imageFormData,
      );

      data.profilePath = profileResponse.data.fileName;
    }

    const response = await authAxios.patch(`/user`, data);

    return makeResponseResult(response, '내정보수정');
  } catch (error: any) {
    return makeResponseResult(error);
  }
}

export default handleUpdateMyData;
