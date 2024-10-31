import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import style from '../styles/footer.module.css';
import Logo from './Logo';
import UserProfile from '@/components/user/components/UserProfile';
import useLoggedStore, {
  LoggedStore,
} from '@/components/stores/user/loggedStore';
import useProfileStore, {
  ProfileStore,
} from '@/components/stores/user/profileStore';

const Footer = ({
  setIsSearching,
}: {
  setIsSearching: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);
  const profile = useProfileStore((state: ProfileStore) => state.path);
  const [isShow, setIsShow] = useState(false);

  return (
    <footer className={style.mainFooter}>
      <div className={style.footerWrap}>
        <section>
          <button onClick={() => setIsSearching(prev => !prev)}>
            {searchIcon}
          </button>
        </section>
        <section>
          <Link href={'/'}>{homeIcon}</Link>
        </section>
        <section className={style.profileWrap}>
          {isLoggedIn ? (
            <Link onClick={() => setIsShow(false)} href={`/user/my`}>
              <UserProfile path={profile} size={25} />
            </Link>
          ) : (
            <Link onClick={() => setIsShow(false)} href={'/login'}>
              로그인
            </Link>
          )}
        </section>
      </div>
    </footer>
  );
};

export default Footer;

const searchIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 19L16.297 15.297M18.2353 10.6176C18.2353 6.96282 15.2725 4 11.6176 4C7.96282 4 5 6.96282 5 10.6176C5 14.2725 7.96282 17.2353 11.6176 17.2353C15.2725 17.2353 18.2353 14.2725 18.2353 10.6176Z"
      stroke="#767676"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const homeIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.48916 10.3462L12 4.83533L17.5108 10.3462H17.5096V19.5289H6.49032V10.3462H6.48916ZM4.65378 12.1816L3.2977 13.5376L2 12.2399L10.7025 3.53746C11.4191 2.82085 12.5809 2.82085 13.2975 3.53746L22 12.2399L20.7023 13.5376L19.3462 12.1815V19.5289C19.3462 20.5432 18.5239 21.3655 17.5096 21.3655H6.49032C5.47603 21.3655 4.65378 20.5432 4.65378 19.5289V12.1816Z"
      fill="#767676"
    />
  </svg>
);
