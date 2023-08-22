import { forwardRef, ForwardedRef, useEffect, useRef } from 'react';
import classnames from 'classnames';
import autosize from 'autosize';
import styled from 'styled-components';

import { useCombinedRefs } from '@app/hooks';

import { ValidationError } from '../ValidationError';

interface TextAreaProps {
  className?: string;
  disabled?: boolean;
  dirty?: boolean;
  error?: string;
  maxLength?: number;
  placeholder?: string;
  prefix?: string;
  textAreaClassName?: string;
}

export const TextArea = forwardRef(
  (
    {
      className,
      dirty,
      error,
      maxLength,
      prefix,
      textAreaClassName,
      ...props
    }: TextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    const textAreaRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, textAreaRef);

    useEffect(() => {
      if (textAreaRef?.current) {
        autosize(textAreaRef?.current);
      }
    }, []);

    return (
      <Wrapper className={classnames(className, 'u-position-relative')}>
        {!!prefix && <div className="c-prefix">{prefix}</div>}
        <textarea
          className={classnames(textAreaClassName, { 'c-input--prepend': prefix })}
          maxLength={maxLength}
          ref={combinedRef}
          rows={1}
          {...props}
        />
        <ValidationError dirty={dirty} error={error} />
      </Wrapper>
    );
  },
);

const Wrapper = styled.div`
  textarea {
    resize: none;
    overflow: hidden;
  }
`;
