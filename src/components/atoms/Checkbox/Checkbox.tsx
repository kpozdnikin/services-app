import { FC, ReactNode } from 'react';
import classnames from 'classnames';

interface CheckboxProps {
  className?: string;
  checked: boolean;
  children?: ReactNode;
  disabled?: boolean;
  id?: string;
  label?: string;
  name?: string;
  onBlur?: (event: any) => void;
  onChange?: (event: any) => void;
  onClick?: (event: any) => void;
  small?: boolean;
  value?: string;
}

export const Checkbox: FC<CheckboxProps> = (props) => {
  const {
    className,
    checked,
    children,
    disabled,
    id,
    label,
    name,
    onBlur,
    onClick,
    onChange,
    small,
    value,
  } = props;

  const content = label ?? children;

  return (
    <div
      className={classnames('c-checkbox u-mr', className, { 'c-checkbox--small': small })}
    >
      <input
        className="c-checkbox__input"
        type="checkbox"
        disabled={disabled}
        checked={checked}
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
      />
      <label className="c-checkbox__label" htmlFor={id}>
        <span className="c-checkbox__trigger" />
        {!!content && <span className="c-checkbox__text">{content}</span>}
      </label>
    </div>
  );
};
