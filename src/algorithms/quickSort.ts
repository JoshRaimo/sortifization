import { ArrayBar, SortingStep } from '../types';
import { createArraySnapshot } from '../utils/arrayHelpers';

export const quickSort = (array: ArrayBar[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  
  // Initial state
  steps.push({
    array: createArraySnapshot(array),
    description: 'Starting quick sort. We will select a pivot and partition the array around it.'
  });
  
  // Call the recursive helper function
  quickSortHelper(array, 0, array.length - 1, steps);
  
  // Final state - all elements should be sorted
  for (let i = 0; i < array.length; i++) {
    array[i].state = 'sorted';
  }
  
  steps.push({
    array: createArraySnapshot(array),
    description: 'Quick Sort complete! The array is now fully sorted.'
  });
  
  return steps;
};

const quickSortHelper = (
  array: ArrayBar[],
  low: number,
  high: number,
  steps: SortingStep[]
): void => {
  if (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = partition(array, low, high, steps);
    
    // Recursively sort the subarrays
    quickSortHelper(array, low, pivotIndex - 1, steps);
    quickSortHelper(array, pivotIndex + 1, high, steps);
  } else if (low === high) {
    // Single element is already sorted
    array[low].state = 'sorted';
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Single element at position ${low} is already sorted`
    });
  }
};

const partition = (
  array: ArrayBar[],
  low: number,
  high: number,
  steps: SortingStep[]
): number => {
  // Choose the rightmost element as pivot
  const pivotValue = array[high].value;
  array[high].state = 'pivot';
  
  steps.push({
    array: createArraySnapshot(array),
    description: `Selected pivot at position ${high}`
  });
  
  // Index of smaller element
  let i = low - 1;
  
  // Highlight the current partition range
  for (let k = low; k <= high; k++) {
    if (k !== high) { // Don't change the pivot
      array[k].state = 'current';
    }
  }
  
  steps.push({
    array: createArraySnapshot(array),
    description: `Partitioning subarray from index ${low} to ${high}`
  });
  
  // Reset states
  for (let k = low; k <= high; k++) {
    if (k !== high) { // Don't change the pivot
      array[k].state = 'default';
    }
  }
  
  // Partition the array
  for (let j = low; j < high; j++) {
    array[j].state = 'comparing';
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Comparing element at position ${j} with pivot`
    });
    
    // If current element is smaller than or equal to pivot
    if (array[j].value <= pivotValue) {
      i++;
      
      // Swap array[i] and array[j]
      if (i !== j) {
        array[i].state = 'comparing';
        
        steps.push({
          array: createArraySnapshot(array),
          description: `Swapping elements at positions ${i} and ${j}`
        });
        
        const temp = { ...array[i] };
        array[i] = { ...array[j] };
        array[j] = temp;
      } else {
        steps.push({
          array: createArraySnapshot(array),
          description: `Element at position ${j} is already in the correct partition`
        });
      }
      
      array[i].state = 'default';
    }
    
    array[j].state = 'default';
  }
  
  // Swap array[i+1] and array[high] (the pivot)
  if (i + 1 !== high) {
    array[i + 1].state = 'comparing';
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Swapping element at position ${i + 1} with pivot`
    });
    
    const temp = { ...array[i + 1] };
    array[i + 1] = { ...array[high] };
    array[high] = temp;
    
    array[i + 1].state = 'sorted'; // The pivot is now in its final position
    array[high].state = 'default';
  } else {
    array[high].state = 'sorted'; // The pivot is already in its final position
  }
  
  steps.push({
    array: createArraySnapshot(array),
    description: `Pivot is now in its final sorted position at index ${i + 1}`
  });
  
  return i + 1;
};