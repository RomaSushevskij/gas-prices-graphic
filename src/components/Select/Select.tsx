import React, { ChangeEvent, DetailedHTMLProps, memo, SelectHTMLAttributes } from 'react';

import style from './Select.module.scss';

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type SelectPropsType = DefaultSelectPropsType & {
  options?: any[];
  onChangeOption?: (option: any) => void;
};

export const Select = memo(
  ({ options, value, onChange, onChangeOption, ...restProps }: SelectPropsType) => {
    const mappedOptions: any[] = options
      ? options.map(o => (
          <option value={o} key={o}>
            {o}
          </option>
        ))
      : [];

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
      if (onChange) onChange(e);
      if (onChangeOption) onChangeOption(e.currentTarget.value);
    };

    return (
      <select
        className={style.selectControl}
        value={value}
        onChange={onChangeCallback}
        {...restProps}
      >
        {mappedOptions}
      </select>
    );
  },
);
