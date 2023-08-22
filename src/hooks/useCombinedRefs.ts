/* eslint-disable no-param-reassign */
import { ForwardedRef, MutableRefObject, useEffect, useRef } from 'react';

export function useCombinedRefs<T>(
  ...refs: (MutableRefObject<T> | ForwardedRef<T>)[]
): MutableRefObject<T> {
  const targetRef = useRef<T>() as MutableRefObject<T>;

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        (ref as (t: T) => void)(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef as MutableRefObject<T>;
}
