import { ForwardedRef, forwardRef } from 'react';

import { ValidationError } from '../ValidationError';

interface InputProps {
  dirty?: boolean;
  error?: string;
  placeholder?: string;
}

export const Input = forwardRef(
  (
    { dirty, error, placeholder, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => (
    <div className="u-position-relative">
      <input
        className="c-input"
        placeholder={placeholder}
        type="text"
        ref={ref}
        {...props}
      />
      <ValidationError dirty={dirty} error={error} />
    </div>
  ),
);
