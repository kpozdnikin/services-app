import { useEffect, useState } from 'react';

export function useToggle(
  defaultValue = false,
  onToggle?: (isActive: boolean) => void,
): [boolean, () => void, (value: boolean) => void] {
  const [isActive, setActive] = useState(defaultValue);

  const toggleActive = (): void => {
    setActive((isActive) => !isActive);
  };

  useEffect(() => onToggle && onToggle(isActive), [isActive, onToggle]);

  return [isActive, toggleActive, setActive];
}
