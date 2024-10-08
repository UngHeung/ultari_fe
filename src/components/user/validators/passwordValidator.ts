import { ValidationResultOptions } from '@/components/auth/validators/authValidators';

export const validatePassword = (password: string): ValidationResultOptions => {
  const result: ValidationResultOptions = {
    success: false,
    message: '',
  };

  if (!password) {
    result.message = '비밀번호를 입력해주세요.';
    return result;
  }

  result.success = true;
  return result;
};
