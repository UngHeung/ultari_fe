'use client';

import Header from '@/components/common/layouts/Header';
import Footer from '@/components/common/layouts/Footer';
import './globals.css';
import './reset.css';
import Modal from '@/components/modal/Modal';
import { useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 모달 상태
  const [modalIsShow, setModalIsShow] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'alert' | 'confirm' | 'prompt'>(
    'alert',
  );

  return (
    <html lang="ko">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Modal
          title={'테스트'}
          type={modalType}
          message={'테스트'}
          modalIsShow={modalIsShow}
          setModalIsShow={setModalIsShow}
        />
        <>
          {/* 모달 테스트 */}
          <select
            name=""
            id=""
            onChange={event =>
              setModalType(event.target.value as 'alert' | 'confirm' | 'prompt')
            }
          >
            <option value={'alert'}>alert</option>
            <option value={'confirm'}>confirm</option>
            <option value={'prompt'}>prompt</option>
          </select>
          <button onClick={() => setModalIsShow(true)}>모달 테스트 </button>
        </>
      </body>
    </html>
  );
}
