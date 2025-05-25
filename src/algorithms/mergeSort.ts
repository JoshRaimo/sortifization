import { ArrayBar, SortingStep } from '../types';
import { createArraySnapshot } from '../utils/arrayHelpers';

export const mergeSort = (array: ArrayBar[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  
  // Initial state
  steps.push({
    array: createArraySnapshot(array),
    description: 'Starting merge sort. We will divide the array into halves and merge them back in sorted order.'
  });
  
  // Call the recursive helper function
  mergeSortHelper(array, 0, array.length - 1, steps);
  
  // Final state - all elements should be sorted
  for (let i = 0; i < array.length; i++) {
    array[i].state = 'sorted';
  }
  
  steps.push({
    array: createArraySnapshot(array),
    description: 'Merge Sort complete! The array is now fully sorted.'
  });
  
  return steps;
};

const mergeSortHelper = (
  array: ArrayBar[],
  left: number,
  right: number,
  steps: SortingStep[]
): void => {
  if (left < right) {
    // Find the middle point
    const mid = Math.floor((left + right) / 2);
    
    // Highlight the current range we're working on
    for (let i = left; i <= right; i++) {
      array[i].state = 'current';
    }
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Dividing array from index ${left} to ${right} at midpoint ${mid}`
    });
    
    // Reset states
    for (let i = left; i <= right; i++) {
      array[i].state = 'default';
    }
    
    // Sort first and second halves
    mergeSortHelper(array, left, mid, steps);
    mergeSortHelper(array, mid + 1, right, steps);
    
    // Merge the sorted halves
    merge(array, left, mid, right, steps);
  }
};

const merge = (
  array: ArrayBar[],
  left: number,
  mid: number,
  right: number,
  steps: SortingStep[]
): void => {
  // Create temporary arrays
  const leftArray: ArrayBar[] = [];
  const rightArray: ArrayBar[] = [];
  
  // Copy data to temporary arrays
  for (let i = left; i <= mid; i++) {
    leftArray.push({ ...array[i] });
  }
  
  for (let j = mid + 1; j <= right; j++) {
    rightArray.push({ ...array[j] });
  }
  
  // Highlight the subarrays we're merging
  for (let i = left; i <= mid; i++) {
    array[i].state = 'comparing';
  }
  
  for (let i = mid + 1; i <= right; i++) {
    array[i].state = 'comparing';
  }
  
  steps.push({
    array: createArraySnapshot(array),
    description: `Merging subarrays from index ${left} to ${mid} and from ${mid + 1} to ${right}`
  });
  
  // Reset states
  for (let i = left; i <= right; i++) {
    array[i].state = 'default';
  }
  
  // Merge the temporary arrays
  let i = 0; // Index of leftArray
  let j = 0; // Index of rightArray
  let k = left; // Index of merged array
  
  while (i < leftArray.length && j < rightArray.length) {
    // Compare elements from both subarrays
    if (leftArray[i].value <= rightArray[j].value) {
      array[k].value = leftArray[i].value;
      array[k].state = 'current';
      
      steps.push({
        array: createArraySnapshot(array),
        description: `Placing element from left subarray at position ${k}`
      });
      
      i++;
    } else {
      array[k].value = rightArray[j].value;
      array[k].state = 'current';
      
      steps.push({
        array: createArraySnapshot(array),
        description: `Placing element from right subarray at position ${k}`
      });
      
      j++;
    }
    
    // Reset current position state
    array[k].state = 'default';
    k++;
  }
  
  // Copy remaining elements of leftArray if any
  while (i < leftArray.length) {
    array[k].value = leftArray[i].value;
    array[k].state = 'current';
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Placing remaining element from left subarray at position ${k}`
    });
    
    array[k].state = 'default';
    i++;
    k++;
  }
  
  // Copy remaining elements of rightArray if any
  while (j < rightArray.length) {
    array[k].value = rightArray[j].value;
    array[k].state = 'current';
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Placing remaining element from right subarray at position ${k}`
    });
    
    array[k].state = 'default';
    j++;
    k++;
  }
  
  // Mark the merged subarray as sorted
  for (let i = left; i <= right; i++) {
    array[i].state = 'current';
  }
  
  steps.push({
    array: createArraySnapshot(array),
    description: `Subarray from index ${left} to ${right} is now merged and sorted`
  });
  
  // Reset states
  for (let i = left; i <= right; i++) {
    array[i].state = 'default';
  }
};