import { ChangeEvent, VFC, forwardRef, ForwardedRef } from 'react';
import uniqueId from 'lodash/uniqueId';

interface CheckboxSwitchProps {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  dirty?: boolean;
  error?: string;
  label?: string;
  labelOnTheRight?: boolean;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxSwitch: VFC<CheckboxSwitchProps> = forwardRef(
  (
    { checked, className, dirty, label, labelOnTheRight, ...props },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const showLabelOnTop = !!(label && labelOnTheRight);
    const showLabelOnBottom = !!(label && !labelOnTheRight);
    const id = uniqueId('switch-');

    return (
      <div className={className}>
        <div className="c-switch u-inline-block u-align-middle">
          {showLabelOnTop && <div className="c-switch__text u-mr-">{label}</div>}
          <input
            checked={checked}
            className="c-switch__toggle"
            id={id}
            type="checkbox"
            ref={ref}
            {...props}
          />
          <label className="c-switch__label" htmlFor={id} />
          {showLabelOnBottom && <div className="c-switch__text u-mr--">{label}</div>}
        </div>
      </div>
    );
  },
);
