import { baseAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { FormEvent } from 'react';
import { validateSignUp } from '../validators/authValidators';

export const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);
  const checkPassword = formData.get('checkPassword') as string;

  const data = {
    account: formData.get('account') as string,
    password: formData.get('password') as string,
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    community: formData.get('community') as string,
  };

  const { success, message } = validateSignUp({ ...data, checkPassword });

  if (!success) {
    return {
      success: success,
      message: message,
    };
  }

  try {
    const response = await baseAxios.post('/auth/signup', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return makeResponseResult(response);
  } catch (error: any) {
    return makeResponseResult(error);
  }
};
