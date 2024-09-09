import { LoginOptions } from '../constants/authConst';

export interface ValidationResultOptions {
  success: boolean;
  message?: string;
}

export const loginValidators = ({ account, password }: LoginOptions) => {
  const result: ValidationResultOptions = {
    success: false,
    message: '',
  };

  if (!account) {
    result.message = '아이디를 입력해주세요.';
    return result;
  }

  if (!password) {
    result.message = '비밀번호를 입력해주세요.';
    return result;
  }

  result.success = true;
  return result;
};
