'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import style from './styles/modal.module.css';
import Image from 'next/image';
import modalSuccess from '@/public/images/modal_success.png';
import modalCloseButton from '@/public/images/modal_close_button.png';
import { PUBLIC_IMAGE_PATH } from '../common/constants/pathConst';
import { useRouter } from 'next/navigation';

const Modal = ({
  title,
  type,
  success,
  message,
  path,
  modalIsShow,
  setModalIsShow,
}: {
  title: string;
  type: 'alert' | 'confirm' | 'prompt';
  success?: boolean;
  message: string;
  path?: string;
  modalIsShow: boolean;
  setModalIsShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

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
      <div
        className={`${style.modalCover} ${modalIsShow ? style.isShow : style.isNotShow}`}
      >
        <article className={style.modalWrap}>
          <header className={style.modalHeader}>
            <h2 className={'a11y-hidden'}>{title}</h2>
            <button
              className={style.modalCloseButton}
              onClick={() => setModalIsShow(false)}
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
            {path && (
              <button onClick={() => router.push(`${path}`)}>이동</button>
            )}
          </footer>
        </article>
      </div>
    </>
  );
};

export const getModalImage = (type: 'alert' | 'confirm' | 'prompt'): string => {
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
