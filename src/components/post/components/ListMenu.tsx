import { useDispatch } from 'react-redux';
import BaseButton from '../../common/BaseButton';
import { OrderTypes } from '../../stores/constants/stateOptions';
import { setPostListOrderBy } from '../../stores/reducer/PostListReducer';
import style from './styles/menu.module.css';

const ListMenu = ({
  postListProcess,
}: {
  postListProcess: (type: OrderTypes) => void;
}) => {
  const dispatch = useDispatch();

  return (
    <menu>
      <ul className={style.menuList}>
        <li key={'btndesc'} className={style.menuItem}>
          <BaseButton
            className={style.button}
            type={'button'}
            value={'최신순'}
            onClick={async () => {
              dispatch(setPostListOrderBy({ value: 'DESC' }));
              postListProcess('DESC');
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
              dispatch(setPostListOrderBy({ value: 'ASC' }));
              postListProcess('ASC');
            }}
          />
        </li>
      </ul>
    </menu>
  );
};

export default ListMenu;
