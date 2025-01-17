/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay = 300
): (...args: Parameters<T>) => void {
  let timeout: number;

  const debounced = (...args: Parameters<T>) => {
    window.clearTimeout(timeout);
    const later = () => {
      window.clearTimeout(timeout);
      func(...args);
    };
    timeout = window.setTimeout(later, delay);
  };

  return debounced;
}

export const useDebounce = (delay: number) => {
  return useCallback(
    debounce((func) => (func as VoidFunction)(), delay),
    [delay]
  );
};
