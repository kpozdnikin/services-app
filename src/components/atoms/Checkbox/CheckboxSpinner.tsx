import { VFC } from 'react';
import classNames from 'classnames';

import { Spinner } from '@app/assets/icons';

interface CheckboxSpinnerProps {
  className?: string;
}

export const CheckboxSpinner: VFC<CheckboxSpinnerProps> = ({ className }) => (
  <div className={classNames('c-checkbox--holder u-mr', className)}>
    <div className="c-handoff-bar__spinner">
      <Spinner />
    </div>
  </div>
);
