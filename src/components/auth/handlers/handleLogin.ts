import { baseAxios } from '@/apis/axiosInstance';
import {
  makeResponseResult,
  ResultDataOptions,
} from '@/components/common/functions/returnResponse';
import { FormEvent } from 'react';
import { setAccessToken, setRefreshToken } from '../functions/tokenInteract';
import { validateLogin } from '../validators/authValidators';

const handleLogin = async (
  event: FormEvent<HTMLFormElement>,
): Promise<ResultDataOptions> => {
  const formData = new FormData(event.currentTarget);

  const data = {
    account: formData.get('account') as string,
    password: formData.get('password') as string,
  };

  const { success, message } = validateLogin(data);

  if (!success) {
    return {
      success: success,
      message: message,
    };
  }

  const basicToken = getBasicTokenByAccountAndPassword(
    data.account,
    data.password,
  );

  try {
    const response = await baseAxios.post('/auth/login/account', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: basicToken,
      },
    });

    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);

    return makeResponseResult(response, '로그인');
  } catch (error: any) {
    return makeResponseResult(error);
  }
};

export default handleLogin;

function getBasicTokenByAccountAndPassword(account: string, password: string) {
  const prefix = 'Basic';
  const base64String = Buffer.from(`${account}:${password}`).toString('base64');
  const basicToken = `${prefix} ${base64String}`;

  return basicToken;
}
