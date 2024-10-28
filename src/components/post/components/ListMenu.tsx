import {
  CursorOption,
  SliceOptions,
} from '@/components/stores/interfaces/stateInterface';
import { SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseButton from '../../common/BaseButton';
import { OrderTypes, SortTypes } from '../../stores/constants/stateOptions';
import {
  setPostListOrderBy,
  setPostListSortBy,
} from '../../stores/reducer/PostListReducer';
import style from '../styles/menu.module.css';

const ListMenu = ({
  setSortBy,
  setOrderBy,
  setCursor,
}: {
  setSortBy: React.Dispatch<SetStateAction<SortTypes>>;
  setOrderBy: React.Dispatch<SetStateAction<OrderTypes>>;
  setCursor: React.Dispatch<SetStateAction<CursorOption>>;
}) => {
  const descCursor = useSelector(
    (state: SliceOptions) => state.postList.desc.cursor,
  );
  const ascCursor = useSelector(
    (state: SliceOptions) => state.postList.asc.cursor,
  );
  const likesCursor = useSelector(
    (state: SliceOptions) => state.postList.likes.cursor,
  );

  const dispatch = useDispatch();

  return (
    <menu>
      <ul className={style.menuList}>
        <li key={'btnlikes'} className={style.menuItem}>
          <BaseButton
            className={style.button}
            type={'button'}
            value={'인기순'}
            onClick={async () => {
              setSortBy('likeCount');
              dispatch(setPostListSortBy({ value: 'likeCount' }));
              setOrderBy('DESC');
              dispatch(setPostListOrderBy({ value: 'DESC' }));
            }}
          />
        </li>
        <div className={style.listLine}></div>
        <li key={'btndesc'} className={style.menuItem}>
          <BaseButton
            className={style.button}
            type={'button'}
            value={'최신순'}
            onClick={async () => {
              setSortBy('id');
              dispatch(setPostListSortBy({ value: 'id' }));
              setOrderBy('DESC');
              dispatch(setPostListOrderBy({ value: 'DESC' }));
            }}
          />
        </li>
        <div className={style.listLine}></div>
        <li key={'btnasc'} className={style.menuItem}>
          <BaseButton
            className={style.button}
            type={'button'}
            value={'날짜순'}
            onClick={async () => {
              setSortBy('id');
              dispatch(setPostListSortBy({ value: 'id' }));
              setOrderBy('ASC');
              dispatch(setPostListOrderBy({ value: 'ASC' }));
            }}
          />
        </li>
      </ul>
    </menu>
  );
};

export default ListMenu;
