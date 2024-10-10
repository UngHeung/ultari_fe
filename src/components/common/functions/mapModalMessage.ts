import { ModalState } from '@/components/stores/interfaces/stateInterface';

function mapModalMessage(data: ModalState) {
  const title = data.title;
  const message = data.message;
  const success = data.success ? '성공' : '실패';

  if (!title) return '서버에 문제가 발생했습니다.';

  if (title.startsWith('로그')) {
    return `${title} ${success}\n${message}`;
  }

  if (title.startsWith('회원전용')) {
    if (title.endsWith('페이지')) {
      return '로그인이 필요한 페이지입니다.';
    } else if (title.endsWith('기능')) {
      return '로그인 후 다시 시도해주세요.';
    }
  }

  if (title.startsWith('팀')) {
    return '';
  }

  return '서버에 문제가 발생했습니다';
}

export default mapModalMessage;
