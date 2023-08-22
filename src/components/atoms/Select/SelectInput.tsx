import { ChangeEvent, forwardRef, ForwardedRef } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import isObject from 'lodash/isObject';
import get from 'lodash/get';

import { Option } from '@app/types';

import { ValidationError } from '../ValidationError';

export type Options = Option[] | number[];

export interface SelectInputProps {
  className?: string;
  disabled?: boolean;
  dirty?: boolean;
  error?: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Options;
  selectClassName?: string;
  suffix?: string;
  empty?: boolean;
  value?: string;
}

export const SelectInput = forwardRef(
  (props: SelectInputProps, ref: ForwardedRef<HTMLSelectElement>) => {
    const {
      className,
      dirty,
      error,
      name,
      options,
      selectClassName,
      suffix,
      empty,
      value,
      ...otherProps
    } = props;

    const list = options.map((option) => {
      let value;
      let label;

      if (isObject(option)) {
        value = get(option, 'value');
        label = get(option, 'label');
      } else {
        value = option;
        label = option;
      }

      return (
        <option value={value} key={`${name}-${value}`}>
          {label}
          {suffix ? ` ${suffix}` : ''}
        </option>
      );
    });

    if (empty) {
      list.unshift(<option key={`${name}-empty`} value="" />);
    }

    return (
      <div className={classNames('u-position-relative', className)}>
        <Select
          className={classNames('c-select', selectClassName)}
          name={name}
          ref={ref}
          value={value}
          {...otherProps}
        >
          {list}
        </Select>
        <ValidationError dirty={dirty} error={error} />
      </div>
    );
  },
);

const Select = styled.select`
  &.no-min-width {
    min-width: 0;
  }
`;
