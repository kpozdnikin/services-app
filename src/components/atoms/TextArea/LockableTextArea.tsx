import { FC, ForwardedRef, forwardRef } from 'react';

import { LockableWrapper } from '../LockableWrapper';
import { TextArea } from './TextArea';

interface LockableTextAreaProps {
  className?: string;
  disabled?: boolean;
  dirty?: boolean;
  error?: string;
  fieldClassName?: string;
  hint?: string;
  name?: string;
  maxLength?: number;
  register?: any;
  textAreaClassName?: string;
  type?: string;
  placeholder?: string;
}

export const LockableTextArea: FC<LockableTextAreaProps> = forwardRef(
  (props, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { disabled, hint, fieldClassName, ...otherProps } = props;

    return (
      <LockableWrapper className={fieldClassName} disabled={disabled} hint={hint}>
        <TextArea disabled={disabled} ref={ref} {...otherProps} />
      </LockableWrapper>
    );
  },
);
