import { defaultAxios } from '@/apis/axiosDefault';
import { SIGN_UP_PATH } from '@/components/common/constants/pathConst';
import { FormEvent } from 'react';
import { SignUpOptionsEnum } from '../constants/authEnum';
import { validateSignUp } from '../validators/authValidators';
import axios from 'axios';

export const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);
  const account = formData.get(SignUpOptionsEnum.ACCOUNT) as string;
  const password = formData.get(SignUpOptionsEnum.PASSWORD) as string;
  const checkPassword = formData.get(
    SignUpOptionsEnum.CHECK_PASSWORD,
  ) as string;
  const name = formData.get(SignUpOptionsEnum.NAME) as string;
  const phone = formData.get(SignUpOptionsEnum.PHONE) as string;
  const email = formData.get(SignUpOptionsEnum.EMAIL) as string;
  const community = formData.get(SignUpOptionsEnum.COMMUNITY) as string;

  const validationSignUpData = validateSignUp({
    account,
    password,
    checkPassword,
    name,
    phone,
    email,
    community,
  });

  if (!validationSignUpData.success) {
    return {
      success: validationSignUpData.success,
      message: validationSignUpData.message,
    };
  }

  const url = SIGN_UP_PATH;
  const data = { account, password, name, phone, email, community };

  try {
    const response = await defaultAxios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return {
      status: response.status,
      success: true,
      message: '회원가입 성공!',
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.status,
        success: false,
        message: error.response?.data.message || '서버에 문제 발생',
      };
    } else {
      return {
        status: 500,
        success: false,
        message: '서버에 문제 발생',
      };
    }
  }
};
