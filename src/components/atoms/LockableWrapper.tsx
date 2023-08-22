import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { Lock } from '@app/assets/svgs';

interface LockableWrapperProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  hint?: string;
}

export const LockableWrapper: FC<LockableWrapperProps> = ({
  children,
  className,
  disabled,
  hint,
}) => (
  <Wrapper className={classNames('c-protected-input', className)}>
    {children}
    {disabled && (
      <div className="c-protected-input-trigger">
        {hint && <span className="c-protected-input-popup">{hint}</span>}
      </div>
    )}
  </Wrapper>
);

const Wrapper = styled.div`
  .c-protected-input-trigger {
    &:after {
      mask-image: url(${Lock});
      -webkit-mask-image: url(${Lock});
    }
  }
`;
