import { FC } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { Option } from '@app/types';

import { SelectMultiple } from './SelectMultiple';

interface FormWrapperProps {
  dirty?: boolean[];
  error?: (string | undefined)[];
  name: string;
  options: Option[];
  setValue: UseFormSetValue<any>;
  value: string[];
}

export const SelectMultipleField: FC<FormWrapperProps> = (props) => {
  const { dirty, error, name, options, setValue, value } = props;

  const onChange = (values: string[]) => {
    setValue(name, values, { shouldValidate: true });
  };

  const firstError = error?.find(Boolean);

  return (
    <SelectMultiple
      direction="row"
      dirty={dirty}
      error={firstError}
      name={name}
      options={options}
      setValue={onChange}
      value={value}
    />
  );
};
