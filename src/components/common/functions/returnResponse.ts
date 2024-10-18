import { AxiosResponse } from 'axios';

export interface ResultDataOptions {
  success: boolean;
  message: string;
  data?: any;
}

export function makeResponseResult(
  { status, data, message }: AxiosResponse & { message?: string },
  requestName?: string,
): ResultDataOptions {
  const responseMessage = message;
  const result: ResultDataOptions = {
    success: false,
    message: message ?? '',
    data: data,
  };

  if (Math.round(status / 100) === 2) {
    result.success = true;
    result.message = `${requestName ? requestName + ' ' : ''}요청 성공`;
  } else if (status === 400) {
    result.message = '잘못된 요청입니다.\n';
  } else if (status === 401 || status === 403) {
    result.message = '접근 권한이 없습니다.';
  } else if (status === 404) {
    result.message = '데이터를 찾을 수 없습니다.';
  } else if (status === 405) {
    result.message = '사용할 수 없는 메소드입니다.';
  } else if (status === 409) {
    result.message = '중복된 요청입니다.';
  } else if (status === 500) {
    result.message = '알 수 없는 요청입니다.';
  } else {
    result.message = '서버에 문제가 발생했습니다.';
  }

  result.message += message ? `\n(${responseMessage})` : '';

  return result;
}
