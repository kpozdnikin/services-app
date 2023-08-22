import { ForwardedRef, forwardRef, VFC, FocusEvent } from 'react';
import classnames from 'classnames';
// @ts-ignore
import SimpleCurrencyInput from 'react-simple-currency';

import { useServiceApp } from '@app/hooks';

import { currencyConfig } from './const';
import { ValidationError } from '../ValidationError';

interface CurrencyInputProps {
  className?: string;
  disabled?: boolean;
  dirty?: boolean;
  error?: string;
  name?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  precision?: string;
  setValue: (value: string | undefined) => void;
  showPrefix?: boolean;
  value?: number;
}

export const CurrencyInput: VFC<CurrencyInputProps> = forwardRef(
  (props, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      className,
      disabled,
      dirty,
      error,
      name,
      onBlur,
      placeholder,
      setValue,
      showPrefix,
      value,
    } = props;
    const { currency } = useServiceApp();
    const { decimalSeparator, currencyPrefix } = currencyConfig(currency);

    return (
      <div className="u-position-relative" data-automation-id="currency-input">
        {showPrefix && <div className="c-prefix">{currencyPrefix}</div>}
        <SimpleCurrencyInput
          className={classnames(className, { 'c-input--prepend': showPrefix })}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          separator={decimalSeparator}
          ref={ref}
          value={value}
          onInputBlur={onBlur}
          onInputChange={setValue}
        />
        <ValidationError dirty={dirty} error={error} />
      </div>
    );
  },
);
