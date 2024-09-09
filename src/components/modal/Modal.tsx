'use client';

import React, { useEffect, useState } from 'react';
import style from './styles/modal.module.css';
import Image from 'next/image';
import modalSuccess from '@/public/images/modal_success.png';
import modalCloseButton from '@/public/images/modal_close_button.png';
import ModalButton from './ModalButton';
import { PUBLIC_IMAGE_PATH } from '../common/constants/pathConst';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { resetModal } from '../stores/reducer/modalRducer';
import { SliceOptions } from '../stores/constants/stateOptions';
import { modalType } from './constants/modalConst';

const Modal = () => {
  const router = useRouter();
  const [theme, setTheme] = useState<'dark' | 'light'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );
  const { title, type, success, message, path } = useSelector(
    (state: SliceOptions) => state?.modal,
  );
  const dispatch = useDispatch();

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
              width={100}
              height={50}
              style={{ objectPosition: success ? 0 : -50 }}
              alt={success ? '모달 성공 이미지' : '모달 실패 이미지'}
            />
          </section>
          <section className={style.messageWrap}>
            <p>{message}</p>
          </section>
          <footer className={style.modalFooter}>
            <div className={style.buttonWrap}>
              {type === 'confirm' ? (
                <ModalButton
                  type={'button'}
                  value={'확인'}
                  styleClass={`${style.modalButton} ${style.buttonConfirm}`}
                  autoFocus={true}
                  onClick={() => {
                    dispatch(resetModal());
                    path && router.push(`${path}`);
                  }}
                />
              ) : type === 'alert' ? (
                <ModalButton
                  type={'button'}
                  value={'취소'}
                  styleClass={`${style.modalButton} ${style.buttonFailure}`}
                  autoFocus={true}
                  onClick={() => {
                    dispatch(resetModal());
                  }}
                />
              ) : null}
            </div>
          </footer>
        </article>
      </div>
    </>
  );
};

export const getModalImage = (type: modalType): string => {
  if (type === 'alert') {
    return `${PUBLIC_IMAGE_PATH}/modal_success.png`;
  } else if (type === 'confirm') {
    return 'confirm';
  } else if (type === 'prompt') {
    return 'prompt';
  } else {
    return '';
  }
};

export default Modal;
