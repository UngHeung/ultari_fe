import axios from 'axios';
import { BASE_URL, LOGIN_PATH } from '@/components/common/constants/pathConst';
import { FormEvent } from 'react';
import { TokenPrefixEnum } from '../constants/tokenEnum';
import { ACCESS_TOKEN } from '../constants/accessToken';
import { loginValidators } from '../validators/authValidators';
import { LoginOptionsEnum } from '../constants/authEnum';

export const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);
  const account = formData.get(LoginOptionsEnum.ACCOUNT) as string;
  const password = formData.get(LoginOptionsEnum.PASSWORD) as string;

  const validationLoginData = loginValidators({ account, password });

  if (!validationLoginData.success) {
    return {
      success: validationLoginData.success,
      message: validationLoginData.message,
    };
  }

  const prefix = TokenPrefixEnum.BASIC;
  const base64String = Buffer.from(`${account}:${password}`).toString('base64');
  const basicToken = `${prefix} ${base64String}`;

  const url = `${BASE_URL}/${LOGIN_PATH}`;
  const data = { account, password };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: basicToken,
      },
    });

    ACCESS_TOKEN.accessToken = response.data.accessToken;
    localStorage.setItem('refreshToken', response.data.refreshToken);

    return {
      status: response.status,
      success: true,
      message: '로그인 성공!',
    };
  } catch (error: any) {
    return {
      status: error.status,
      success: false,
      message: error.response.data.message,
    };
  }
};
