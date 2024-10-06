import { defaultAxios } from '@/apis/axiosDefault';
import { LOGIN_PATH } from '@/components/common/constants/pathConst';
import axios from 'axios';
import { FormEvent } from 'react';
import { LoginOptionsEnum } from '../constants/authEnum';
import { TokenPrefixEnum } from '../constants/tokenEnum';
import { setAccessToken, setRefreshToken } from '../functions/tokenInteract';
import { validateLogin } from '../validators/authValidators';

const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
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

  const basicToken = getBasicTokenByAccountAndPassword(
    data.account,
    data.password,
  );

  const url = LOGIN_PATH;

  try {
    const response = await defaultAxios.post(url, data, {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data.message || '서버에 문제 발생',
      };
    } else {
      return {
        success: false,
        message: '서버에 문제 발생',
      };
    }
  }
};

function getBasicTokenByAccountAndPassword(account: string, password: string) {
  const prefix = TokenPrefixEnum.BASIC;
  const base64String = Buffer.from(`${account}:${password}`).toString('base64');
  const basicToken = `${prefix} ${base64String}`;

  return basicToken;
}

export default handleLogin;
