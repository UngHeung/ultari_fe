'use client';

import React, { useState } from 'react';
import style from './styles/write.module.css';
import PostButton from './elements/PostButton';
import PostInput from './elements/PostInput';

const Write = () => {
  return (
    <>
      <form
        onSubmit={event => {
          event.preventDefault();
        }}
      >
        <section className={style.titleWrap}>
          <PostInput
            name={'title'}
            styleClass={style.title}
            type={'text'}
            placeholder={'제목'}
          />
        </section>
        <section className={style.contentWrap}>
          <textarea
            name={'content'}
            id=""
            className={style.content}
            placeholder={'내용'}
          />
        </section>
        <section className={style.buttonWrap}>
          <PostButton
            styleClass={`${style.button}`}
            type={'submit'}
            value={'등록'}
          />
          <PostButton
            styleClass={`${style.button}`}
            type={'button'}
            value={'취소'}
          />
        </section>
      </form>
    </>
  );
};

export default Write;
