import { FC, ForwardedRef, forwardRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { CurrencyInput } from './CurrencyInput';

interface FormWrapperProps {
  className?: string;
  dirty?: boolean;
  error?: string;
  name: string;
  placeholder?: string;
  setValue: UseFormSetValue<any>;
  value: number;
}

export const CurrencyInputField: FC<FormWrapperProps> = forwardRef(
  (props, ref: ForwardedRef<HTMLInputElement>) => {
    const { className, dirty, error, name, placeholder, setValue, value } = props;

    const onChange = (value: string | undefined) => {
      setValue(name, value, { shouldValidate: true });
    };

    return (
      <CurrencyInput
        showPrefix
        className={className}
        dirty={dirty}
        error={error}
        name={name}
        placeholder={placeholder}
        setValue={onChange}
        value={value}
      />
    );
  },
);
