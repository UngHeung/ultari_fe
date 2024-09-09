import axios from 'axios';
import {
  BASE_URL,
  SIGN_UP_PATH,
} from '@/components/common/constants/pathConst';
import { FormEvent } from 'react';
import { SignUpOptionsEnum } from '../constants/authEnum';
import { validateSignUp } from '../validators/authValidators';

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

  const validationSignUpData = validateSignUp({
    account,
    password,
    checkPassword,
    name,
    phone,
    email,
  });

  if (!validationSignUpData.success) {
    return {
      success: validationSignUpData.success,
      message: validationSignUpData.message,
    };
  }

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
      message: error.response.data.message,
    };
  }
};
