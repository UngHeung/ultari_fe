import Link from 'next/link';
import style from '../styles/nav.module.css';

const Nav = () => {
  return (
    <nav className={style.mainNav}>
      <ul className={style.mainNavUl}>
        {/* <li>
          <Link href={'/'}>메인</Link>
        </li> */}
        {/* <li>
          <Link href={'/sign'}>회원가입</Link>
        </li> */}
        <li>
          <Link href={'/login'}>로그인</Link>
        </li>
        <li>
          <Link href={'/forgot/password'}>아이디/비밀번호</Link>
        </li>
        <li>
          <Link href={'/post/list'}>게시판</Link>
        </li>
        {/* <li>
          <Link href={'/logout'}>로그아웃</Link>
        </li> */}
        <li>
          <Link href={'/team/create'}>팀생성</Link>
        </li>
        <li>
          <Link href={'/team/list'}>팀목록</Link>
        </li>
        <li>
          <Link href={'/team/detail/2'}>디테일</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
