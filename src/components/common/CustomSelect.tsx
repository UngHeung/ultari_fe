import { useState } from 'react';

import selectArrow from '@/public/images/select-arrow.png';
import Image from 'next/image';
import style from './styles/customSelect.module.css';

export interface CustomSelectOptionOptions {
  option: string;
  data: string;
}

export interface CustomSelectOptions {
  selectOptions: CustomSelectOptionOptions[];
  selectId: string;
  name: string;
  styleClass?: string;
}

const CustomSelect = (props: CustomSelectOptions) => {
  const { selectOptions, selectId, name, styleClass } = props;
  const defaultOption = selectOptions[0].option;

  const [selectedOption, setselectedOption] = useState<string>(defaultOption);
  const [selectionActive, setSelectionActive] = useState<boolean>(false);

  return (
    <div className={`${style.selectWrap} ${styleClass ? styleClass : ''}`}>
      <ul
        className={style.select}
        style={{
          height: selectionActive ? 30 * (selectOptions.length + 1) : 30,
        }}
      >
        <li key={-1} className={style.selectedDisplay}>
          <button
            className={style.selectLabel}
            type={'button'}
            onClick={() => {
              setSelectionActive(isActive => !isActive);
            }}
          >
            {selectedOption}
            <span className={style.arrowWrap}>
              <Image
                src={selectArrow}
                width={10}
                height={6}
                alt={'공개범위 선택 화살표'}
                className={`${style.arrowImage} ${selectionActive ? style.active : ''}`}
              />
            </span>
          </button>
        </li>
        {selectOptions.map((selectOption, idx) => {
          const { option, data } = selectOption;

          return (
            <li key={idx}>
              <label htmlFor={`${selectId}_${idx}`} className={style.option}>
                {option}
              </label>
              <input
                type="radio"
                name={name}
                id={`${selectId}_${idx}`}
                value={data}
                style={{ display: 'none' }}
                onChange={event => {
                  if (event.target.checked) {
                    setselectedOption(option);
                    setSelectionActive(false);
                  }
                }}
                defaultChecked={idx === 0 ? true : false}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CustomSelect;
