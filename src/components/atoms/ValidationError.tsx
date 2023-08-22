import { VFC } from 'react';

export interface ValidationErrorProps {
  error?: string;
  dirty?: boolean;
}

export const ValidationError: VFC<ValidationErrorProps> = ({ error }) => {
  if (error) {
    return <div className="c-input-error-message">{error}</div>;
  }

  return null;
};
