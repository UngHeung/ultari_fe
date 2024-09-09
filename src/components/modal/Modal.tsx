'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import style from './styles/modal.module.css';
import Image from 'next/image';
import { PUBLIC_IMAGE_PATH } from '../common/constants/pathConst';
import { useRouter } from 'next/navigation';
import modalSuccess from '@/public/images/modal_success.png';

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

  return (
    <>
      <div
        className={`${style.modalCover} ${modalIsShow ? style.isShow : style.isNotShow}`}
      >
        <article className={style.modalWrap}>
          <header>
            <h2 className={'a11y-hidden'}>{title}</h2>
            <button onClick={() => setModalIsShow(false)}>닫기</button>
          </header>
          <h3>
            <Image src={modalSuccess} width={300} height={150} alt="" />
          </h3>
          <p>{message}</p>
          <footer>
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
