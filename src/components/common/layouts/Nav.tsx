import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import Link from 'next/link';
import { SetStateAction } from 'react';
import userAuthentication from '../functions/userAuthentication';
import style from '../styles/nav.module.css';

const Nav = ({
  setIsShow,
  isLoggedIn,
}: {
  setIsShow: React.Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
}) => {
  const setModal = useModalStore((state: ModalStore) => state.setModal);

  return (
    <nav className={style.mainNav}>
      <ul className={style.mainNavUl}>
        <li>
          <Link onClick={() => setIsShow(false)} href={'/post/list'}>
            자유게시판
          </Link>
        </li>
        <li>
          <Link
            onClick={event => {
              userAuthentication(isLoggedIn, setModal, event);
              setIsShow(false);
            }}
            href={'/team/create'}
          >
            목장생성
          </Link>
        </li>
        <li>
          <Link onClick={() => setIsShow(false)} href={'/team/list'}>
            목장목록
          </Link>
        </li>
        <li>
          <Link
            onClick={event => {
              userAuthentication(isLoggedIn, setModal, event);
              setIsShow(false);
            }}
            href={'/user/list'}
          >
            유저목록
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
