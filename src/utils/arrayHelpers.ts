import { ArrayBar } from '../types';

export const generateRandomArray = (size: number): ArrayBar[] => {
  const array: ArrayBar[] = [];
  
  for (let i = 0; i < size; i++) {
    array.push({
      value: Math.floor(Math.random() * 100) + 1, // Random number between 1-100
      state: 'default'
    });
  }
  
  return array;
};

export const createArraySnapshot = (array: ArrayBar[]): ArrayBar[] => {
  return array.map(item => ({ ...item }));
};