import axios from 'axios';
import { BASE_URL, LOGIN_PATH } from '@/components/common/constants/pathConst';
import { FormEvent } from 'react';
import { TokenPrefixEnum } from '../constants/tokenEnum';
import { ACCESS_TOKEN } from '../constants/accessToken';
import { validateLogin } from '../validators/authValidators';
import { LoginOptionsEnum } from '../constants/authEnum';
import { setAccessToken, setRefreshToken } from '../functions/tokenInteract';

export const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);
  const data = {
    account: formData.get(LoginOptionsEnum.ACCOUNT) as string,
    password: formData.get(LoginOptionsEnum.PASSWORD) as string,
  };

  const validationLoginData = validateLogin(data);

  if (!validationLoginData.success) {
    return {
      success: validationLoginData.success,
      message: validationLoginData.message,
    };
  }

  const prefix = TokenPrefixEnum.BASIC;
  const base64String = Buffer.from(`${data.account}:${data.password}`).toString(
    'base64',
  );
  const basicToken = `${prefix} ${base64String}`;

  const url = `${BASE_URL}/${LOGIN_PATH}`;

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: basicToken,
      },
    });

    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);

    return {
      success: true,
      message: '로그인 성공!',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
