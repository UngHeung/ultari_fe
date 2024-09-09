import {
  BASE_URL,
  SIGN_UP_PATH,
} from '@/components/common/constants/pathConst';
import axios from 'axios';
import { FormEvent } from 'react';

export const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);
  const account = formData.get('account');
  const password = formData.get('password');
  const name = formData.get('name');
  const phone = formData.get('phone');
  const email = formData.get('email');

  const url = `${BASE_URL}/${SIGN_UP_PATH}`;
  const data = { account, password, name, phone, email };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return {
      status: response.status,
      success: true,
      message: '회원가입 성공!',
    };
  } catch (error: any) {
    return {
      status: error.status,
      success: false,
      message: `${error.response.data.message}`,
    };
  }
};
