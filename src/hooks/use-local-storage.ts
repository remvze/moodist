import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

/**
 * A custom React hook to manage state with localStorage persistence.
 *
 * @template T
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {T} fallback - The fallback value to use if there is no value in localStorage.
 * @returns {[T, SetValue<T>]} An array containing the stateful value and a function to update it.
 */
export function useLocalStorage<T>(key: string, fallback: T): [T, SetValue<T>] {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    const value = localStorage.getItem(key);

    if (!value) return;

    let parsed;

    try {
      parsed = JSON.parse(value);
    } catch (error) {
      parsed = fallback;
    }

    setValue(parsed);
  }, [key, fallback]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
