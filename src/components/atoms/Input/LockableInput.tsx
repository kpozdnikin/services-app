import { FC, ForwardedRef, forwardRef } from 'react';

import { LockableWrapper } from '../LockableWrapper';
import { Input } from './Input';

interface LockableInputProps {
  className?: string;
  disabled?: boolean;
  dirty?: boolean;
  error?: string;
  hint?: string;
  name?: string;
  register?: any;
  type?: string;
  placeholder?: string;
}

export const LockableInput: FC<LockableInputProps> = forwardRef(
  (props, ref: ForwardedRef<HTMLInputElement>) => (
    <LockableWrapper disabled={props.disabled} hint={props.hint}>
      <Input ref={ref} {...props} />
    </LockableWrapper>
  ),
);
