'use client';

import modalSuccess from '@/public/images/modal_success.png';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RouterType } from '../stores/constants/stateOptions';
import useModalStore, { ModalStore } from '../stores/modal/modalStore';
import ModalButton from './ModalButton';
import style from './styles/modal.module.css';

const Modal = () => {
  const router = useRouter();

  const { title, type, success, message, routerType, leftPath, rightPath } =
    useModalStore((state: ModalStore) => state.modal);
  const resetModal = useModalStore((state: ModalStore) => state.resetModal);

  return (
    <>
      <div className={`${style.modalCover}`}>
        <article className={style.modalWrap}>
          <header className={style.modalHeader}>
            <h2 className={'a11y-hidden'}>{title}</h2>
          </header>
          <section className={style.imageWrap}>
            <Image
              src={modalSuccess}
              width={150}
              height={50}
              style={{
                objectPosition:
                  success === undefined ? -100 : success ? 0 : -50,
              }}
              alt={
                success === undefined
                  ? '모달 의사 확인 이미지'
                  : success
                    ? '모달 성공 이미지'
                    : '모달 실패 이미지'
              }
            />
          </section>
          <section className={style.messageWrap}>
            <pre>{message}</pre>
          </section>
          <footer className={style.modalFooter}>
            <div className={style.buttonWrap}>
              {(type === 'confirm' || type === 'prompt') && (
                <ModalButton
                  type={'button'}
                  value={'확인'}
                  styleClass={`${style.modalButton} ${style.buttonConfirm}`}
                  autoFocus={true}
                  onClick={() => {
                    resetModal();

                    routerMapper(router, routerType, leftPath ?? '');
                  }}
                />
              )}
              {(type === 'alert' || type === 'prompt') && (
                <ModalButton
                  type={'button'}
                  value={'취소'}
                  styleClass={`${style.modalButton} ${style.buttonFailure}`}
                  autoFocus={true}
                  onClick={() => {
                    resetModal();

                    if (type === 'alert') {
                      routerMapper(router, routerType, leftPath ?? '');
                    } else if (type === 'prompt') {
                      routerMapper(router, routerType, rightPath ?? '');
                    }
                  }}
                />
              )}
            </div>
          </footer>
        </article>
      </div>
    </>
  );
};

function routerMapper(
  router: AppRouterInstance,
  routerType: RouterType,
  path: string,
) {
  if (routerType === 'back') {
    router.back();
  } else if (routerType === 'push') {
    router.push(path);
  } else if (routerType === 'replace') {
    router.replace(path);
  }
}

export default Modal;
