import BaseButton from '@/components/common/elements/BaseButton';
import usePostListStore, {
  PostListStore,
} from '@/components/stores/post/postListStore';

import style from '../styles/menu.module.css';

const ListMenu = () => {
  const setOrderBy = usePostListStore(
    (state: PostListStore) => state.setOrderBy,
  );
  const setSortBy = usePostListStore((state: PostListStore) => state.setSortBy);

  return (
    <menu>
      <ul className={style.menuList}>
        <li key={'btnlikes'} className={style.menuItem}>
          <BaseButton
            className={style.button}
            type={'button'}
            value={'인기순'}
            onClick={() => {
              setSortBy('likeCount');
              setOrderBy('DESC');
            }}
          />
        </li>
        <div className={style.listLine}></div>
        <li key={'btndesc'} className={style.menuItem}>
          <BaseButton
            className={style.button}
            type={'button'}
            value={'최신순'}
            onClick={() => {
              setSortBy('id');
              setOrderBy('DESC');
            }}
          />
        </li>
        <div className={style.listLine}></div>
        <li key={'btnasc'} className={style.menuItem}>
          <BaseButton
            className={style.button}
            type={'button'}
            value={'날짜순'}
            onClick={() => {
              setSortBy('id');
              setOrderBy('ASC');
            }}
          />
        </li>
      </ul>
    </menu>
  );
};

export default ListMenu;
