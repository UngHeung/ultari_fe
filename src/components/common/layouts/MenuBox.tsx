import useTitleAndDescStore, {
  TitleAndDescriptionStore,
} from '@/components/stores/common/titleAndDescriptionStore';
import { useRouter } from 'next/navigation';
import style from '../styles/menuBox.module.css';

const MenuBox = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const title = useTitleAndDescStore(
    (state: TitleAndDescriptionStore) => state.title,
  );
  const description = useTitleAndDescStore(
    (state: TitleAndDescriptionStore) => state.description,
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

        {children && <>{children}</>}
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
