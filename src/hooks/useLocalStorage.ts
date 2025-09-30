import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(keyName: string, defaultValue: T) {
  const keyRef = useRef(keyName);

  const read = (key: string): T => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(() => read(keyName));

  //If the key changes, reload the value for the new key.
  useEffect(() => {
    if (keyRef.current !== keyName) {
      keyRef.current = keyName;
      setStoredValue(read(keyName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyName]);

  const setValue = (newValue: T) => {
    try {
      window.localStorage.setItem(keyRef.current, JSON.stringify(newValue));
    } finally {
      setStoredValue(newValue);
    }
  };

  return [storedValue, setValue] as const;
}
