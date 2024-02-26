import { useState } from 'react';

export function useLocalStorage(key: string, value: string) {
  const storedRawValue = localStorage.getItem(key);
  if (!storedRawValue) return null;

  if (value) {
    const val = JSON.parse(storedRawValue);
    let newVal;
    if (val.includes(value)) {
      newVal = val.filter((item: string) => item !== value);
    }
    newVal = JSON.stringify([...val, value]);
    localStorage.setItem(key, newVal);
  }

  return storedRawValue;
}
