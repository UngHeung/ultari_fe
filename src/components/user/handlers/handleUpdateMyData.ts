import { fileUploadAxios, authAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { FormEvent } from 'react';

async function handleUpdateMyData(event: FormEvent<HTMLFormElement>) {
  const formData = new FormData(event.currentTarget);

  const file: File = formData.get('profile') as File;
  const data = {
    profile: '',
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    community: formData.get('community') as string,
  };

  if (file.name) {
    try {
      const response = await fileUploadAxios.post('/common/image', {
        image: file,
      });

      data.profile = response.data;
    } catch (error: any) {
      return makeResponseResult(error);
    }
  }

  try {
    const response = await authAxios.patch(`/user`, data);

    return makeResponseResult(response);
  } catch (error: any) {
    return makeResponseResult(error);
  }
}

export default handleUpdateMyData;
