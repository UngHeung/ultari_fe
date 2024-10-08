import { baseAxios, fileUploadAxios } from '@/apis/axiosInstance';
import { FormEvent } from 'react';
import { validateSignUp } from '../validators/authValidators';
import { makeResponseResult } from '@/components/common/functions/returnResponse';

export const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);

  const data = {
    account: formData.get('account') as string,
    password: formData.get('password') as string,
    checkPassword: formData.get('checkPassword') as string,
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    community: formData.get('community') as string,
  };

  const { success, message } = validateSignUp(data);

  if (!success) {
    return {
      success: success,
      message: message,
    };
  }

  try {
    const response = await baseAxios.post('/auth/signup', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return makeResponseResult(response);
  } catch (error: any) {
    return makeResponseResult(error);
  }
};
