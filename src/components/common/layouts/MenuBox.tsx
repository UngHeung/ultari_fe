import React from 'react';
import style from '../styles/menuBox.module.css';
import useTitleAndDescStore, {
  TitleAndDescriptionStore,
} from '@/components/stores/titleAndDescriptionStore';
import { useRouter } from 'next/navigation';
import useMenuBoxChildStore, {
  MenuBoxChildStore,
} from '@/components/stores/menuboxChildrenStore';

const MenuBox = () => {
  const router = useRouter();

  const title = useTitleAndDescStore(
    (state: TitleAndDescriptionStore) => state.title,
  );
  const description = useTitleAndDescStore(
    (state: TitleAndDescriptionStore) => state.description,
  );
  const children = useMenuBoxChildStore(
    (state: MenuBoxChildStore) => state.children,
  );

  return (
    <section className={style.menuBoxWrap}>
      {title && (
        <section className={style.headWrap}>
          <h2 className={style.title}>{title}</h2>
          <p className={style.description}>{description}</p>
        </section>
      )}

      <section className={style.menuWrap}>
        <section className={style.back}>
          <button type={'button'} onClick={router.back}>
            {backIcon}
          </button>
        </section>

        {children && <menu>{children}</menu>}
      </section>
    </section>
  );
};

export default MenuBox;

const backIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5714 17.1429L6.42859 10L13.5714 2.85714"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
