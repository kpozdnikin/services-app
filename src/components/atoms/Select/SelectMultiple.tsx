import { ChangeEvent, ForwardedRef, forwardRef, VFC } from 'react';
import classnames from 'classnames';

import { Option } from '@app/types';

import { Checkbox } from '../Checkbox';

interface SelectMultipleProps {
  className?: string;
  direction: 'row' | 'column';
  dirty?: boolean[];
  error?: string;
  name: string;
  setValue: (value: string[]) => void;
  options: Option[];
  value: string[];
}

export const SelectMultiple: VFC<SelectMultipleProps> = forwardRef(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, direction, dirty, error, name, setValue, options, value } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const arr = [...value];

      if (event.target.checked) {
        arr.push(event.target.value);
      } else {
        arr.splice(arr.indexOf(event.target.value), 1);
      }

      setValue(arr);
    };

    const hasError = !!(dirty && dirty.length > 0 && error);

    return (
      <div className={className} ref={ref}>
        <div
          className={classnames(
            'c-checkbox-list',
            direction === 'row' && 'c-checkbox-list_row',
          )}
        >
          {options.map((option: { label: string; value: string }, index: number) => (
            <div
              className="c-checkbox-list__item"
              key={`checkbox-${option.label}-${index}`}
            >
              <Checkbox
                id={`${name}[${index}]`}
                name={`${name}[${index}]`}
                label={option.label}
                value={option.value}
                checked={value?.includes(option.value)}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        {hasError && <p className="error">{error}</p>}
      </div>
    );
  },
);
