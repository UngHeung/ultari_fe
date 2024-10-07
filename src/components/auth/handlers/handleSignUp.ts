import { defaultAxios } from '@/apis/axiosDefault';
import { FormEvent } from 'react';
import { validateSignUp } from '../validators/authValidators';

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

  const validationSignUpData = validateSignUp(data);

  if (!validationSignUpData.success) {
    return {
      success: validationSignUpData.success,
      message: validationSignUpData.message,
    };
  }

  try {
    const response = await defaultAxios.post('/auth/signup', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return {
      success: true,
      message: '회원가입 성공!',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data.message || '서버에 문제 발생',
    };
  }
};
