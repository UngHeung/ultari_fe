import {
  LoginOptions,
  SignUpOptions,
  ValidationResultOptions,
} from '../interfaces/authInterface';

export const validateLogin = ({ account, password }: LoginOptions) => {
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

export const validateSignUp = ({
  account,
  password,
  checkPassword,
  name,
  phone,
  email,
  community,
}: SignUpOptions) => {
  const result: ValidationResultOptions = {
    success: false,
    message: '',
  };

  if (!account) {
    result.message = '아이디를 입력해주세요.';
    return result;
  }

  if (account.length < 6 || 15 < account.length) {
    result.message = '아이디는 6 ~ 15자의 영문 소문자, 숫자만 입력 가능합니다.';
    return result;
  }

  if (!password) {
    result.message = '비밀번호를 입력해주세요.';
    return result;
  }

  if (password.length < 8 || 20 < password.length) {
    result.message =
      '비밀번호는 8 ~ 20자의 영문 대소문자, 숫자, 특수문자가 포함된 문자열이어야 합니다.';
    return result;
  }

  if (!checkPassword) {
    result.message = '비밀번호 확인을 입력해주세요.';
    return result;
  }

  if (password !== checkPassword) {
    result.message = '입력한 비밀번호가 다릅니다.';
    return result;
  }

  if (!name) {
    result.message = '이름을 입력해주세요.';
    return result;
  }

  if (name.length < 2 || 10 < name.length) {
    result.message = '이름은 2 ~ 10자의 영문, 한글만 입력 가능합니다.';
    return result;
  }

  if (!phone) {
    result.message = '휴대폰 번호를 입력해주세요.';
    return result;
  }

  if (phone.length < 12 || 13 < phone.length) {
    result.message = '휴대폰 번호는 하이픈(-) 포함 12 ~ 13자로 입력해주세요.';
    return result;
  }

  if (!email) {
    result.message = '이메일을 입력해주세요.';
    return result;
  }

  // if (!email) {
  //   result.message = '정확한 이메일 형식을 입력해주세요.';
  //   return result;
  // }

  if (!community) {
    result.message = '소속을 입력해주세요.';
    return result;
  }

  result.success = true;
  return result;
};
