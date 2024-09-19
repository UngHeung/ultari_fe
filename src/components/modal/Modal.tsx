'use client';

import modalCloseButton from '@/public/images/modal_close_button.png';
import modalSuccess from '@/public/images/modal_success.png';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterType } from '../stores/constants/stateOptions';
import { SliceOptions } from '../stores/interfaces/stateInterface';
import { resetModal } from '../stores/reducer/modalRducer';
import ModalButton from './ModalButton';
import style from './styles/modal.module.css';

const Modal = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [theme, setTheme] = useState<'dark' | 'light'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );

  const { title, type, success, message, routerType, leftPath, rightPath } =
    useSelector((state: SliceOptions) => state?.modal);

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        if (event.matches) {
          setTheme('dark');
        } else {
          setTheme('light');
        }
      });
  }, []);

  return (
    <>
      <div className={`${style.modalCover}`}>
        <article className={style.modalWrap}>
          <header className={style.modalHeader}>
            <h2 className={'a11y-hidden'}>{title}</h2>
            <button
              className={style.modalCloseButton}
              onClick={() => dispatch(resetModal())}
            >
              <Image
                src={modalCloseButton}
                alt={'모달 닫기'}
                width={30}
                height={15}
                style={{ objectPosition: theme === 'dark' ? -15 : 0 }}
              />
            </button>
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
            <p>{message}</p>
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
                    dispatch(resetModal());

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
                    dispatch(resetModal());

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
