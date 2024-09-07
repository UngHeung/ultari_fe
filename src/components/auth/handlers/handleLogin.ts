import { BASE_URL, LOGIN_PATH } from '@/components/common/constants/pathConst';
import axios from 'axios';
import { FormEvent } from 'react';
import { TokenPrefixEnum } from '../constants/tokenEnum';

export enum LoginOptionsEnum {
  ACCOUNT = 'account',
  PASSWORD = 'password',
}

export const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const account = formData.get(LoginOptionsEnum.ACCOUNT);
  const password = formData.get(LoginOptionsEnum.PASSWORD);

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

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    return {
      success: true,
      message: '로그인 성공!',
    };
  } catch (error) {
    return {
      success: false,
      message: `로그인 실패\n${error}`,
    };
  }
};
