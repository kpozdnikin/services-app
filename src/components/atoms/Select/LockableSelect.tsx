import { ChangeEvent, FC, ForwardedRef, forwardRef } from 'react';

import { Option } from '@app/types';

import { LockableWrapper } from '../LockableWrapper';
import { SelectInput } from './SelectInput';

interface LockableSelectProps {
  className?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  dirty?: boolean;
  empty?: boolean;
  error?: string;
  hint?: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  register?: any;
  type?: string;
  value?: string;
}

export const LockableSelect: FC<LockableSelectProps> = forwardRef(
  (props, ref: ForwardedRef<HTMLSelectElement>) => (
    <LockableWrapper disabled={props.disabled} hint={props.hint}>
      <SelectInput ref={ref} {...props} />
    </LockableWrapper>
  ),
);
