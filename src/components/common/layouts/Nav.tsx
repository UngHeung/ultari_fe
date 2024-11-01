import useIsShowStore, {
  IsShowStore,
} from '@/components/stores/common/isShowStore';
import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import useLoggedStore, {
  LoggedStore,
} from '@/components/stores/user/loggedStore';
import Link from 'next/link';
import userAuthentication from '../functions/userAuthentication';
import style from '../styles/nav.module.css';

const Nav = () => {
  const setModal = useModalStore((state: ModalStore) => state.setModal);
  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);
  const setMenuIsShow = useIsShowStore(
    (state: IsShowStore) => state.setMenuIsShow,
  );

  return (
    <nav className={style.mainNav}>
      <ul className={style.mainNavUl}>
        <li>
          <Link onClick={() => setMenuIsShow(false)} href={'/post/list'}>
            자유게시판
          </Link>
        </li>
        <li>
          <Link
            onClick={event => {
              userAuthentication(isLoggedIn, setModal, event);
              setMenuIsShow(false);
            }}
            href={'/team/create'}
          >
            목장생성
          </Link>
        </li>
        <li>
          <Link onClick={() => setMenuIsShow(false)} href={'/team/list'}>
            목장목록
          </Link>
        </li>
        <li>
          <Link
            onClick={event => {
              userAuthentication(isLoggedIn, setModal, event);
              setMenuIsShow(false);
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
