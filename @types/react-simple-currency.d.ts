import { Component, ForwardedRef } from 'react';
import 'react-simple-currency';

declare module 'react-simple-currency' {
  interface SimpleCurrencyInputProps {
    autoFocus?: boolean;
    className?: string;
    delimiter?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    onInputChange?(...args: unknown[]): unknown;
    onInputBlur?(...args: unknown[]): unknown;
    onInputFocus?(...args: unknown[]): unknown;
    placeholder?: string;
    precision?: number;
    readOnly?: boolean;
    separator?: string;
    ref?: ForwardedRef<HTMLInputElement>;
    tabIndex?: number;
    unit?: string;
    value: number;
  }

  class SimpleCurrencyInput extends Component<SimpleCurrencyInputProps> {}
}
