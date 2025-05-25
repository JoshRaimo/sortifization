import { ArrayBar, SortingStep } from '../types';
import { createArraySnapshot } from '../utils/arrayHelpers';

export const insertionSort = (array: ArrayBar[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const n = array.length;
  
  // Initial state
  steps.push({
    array: createArraySnapshot(array),
    description: 'Starting insertion sort. We will build the sorted array one item at a time.'
  });
  
  // First element is already "sorted"
  array[0].state = 'sorted';
  
  steps.push({
    array: createArraySnapshot(array),
    description: 'The first element is already considered sorted.'
  });
  
  for (let i = 1; i < n; i++) {
    // Current element to be inserted
    const key = array[i].value;
    let j = i - 1;
    
    // Mark current element
    array[i].state = 'current';
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Inserting element at position ${i} into the sorted portion of the array`
    });
    
    // Compare with each element in the sorted array
    while (j >= 0 && array[j].value > key) {
      array[j].state = 'comparing';
      
      steps.push({
        array: createArraySnapshot(array),
        description: `Comparing with element at position ${j}, shifting if needed`
      });
      
      // Shift elements
      array[j + 1].value = array[j].value;
      array[j].state = 'default';
      
      j--;
      
      // Update visualization after each shift
      steps.push({
        array: createArraySnapshot(array),
        description: 'Shifted element to the right to make room for the current element'
      });
    }
    
    // Place the current element in its correct position
    array[j + 1].value = key;
    array[i].state = 'default';
    
    // Mark all elements in sorted portion
    for (let k = 0; k <= i; k++) {
      array[k].state = 'sorted';
    }
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Placed element at its correct position in the sorted array`
    });
  }
  
  // Final state - all elements should be sorted
  for (let i = 0; i < array.length; i++) {
    array[i].state = 'sorted';
  }
  
  steps.push({
    array: createArraySnapshot(array),
    description: 'Insertion Sort complete! The array is now fully sorted.'
  });
  
  return steps;
};