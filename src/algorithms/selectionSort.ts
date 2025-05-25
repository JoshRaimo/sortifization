import { ArrayBar, SortingStep } from '../types';
import { createArraySnapshot } from '../utils/arrayHelpers';

export const selectionSort = (array: ArrayBar[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const n = array.length;
  
  // Initial state
  steps.push({
    array: createArraySnapshot(array),
    description: 'Starting selection sort. We will find the minimum element and place it at the beginning.'
  });
  
  for (let i = 0; i < n - 1; i++) {
    // Assume the first unsorted element is the minimum
    let minIdx = i;
    array[minIdx].state = 'current';
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Finding the minimum element in the unsorted portion starting at position ${i}`
    });
    
    // Find the minimum element in the unsorted part
    for (let j = i + 1; j < n; j++) {
      array[j].state = 'comparing';
      
      steps.push({
        array: createArraySnapshot(array),
        description: `Comparing ${array[j].value} with current minimum ${array[minIdx].value}`
      });
      
      if (array[j].value < array[minIdx].value) {
        // If we found a new minimum, update minIdx
        if (minIdx !== i) {
          array[minIdx].state = 'default';
        }
        
        minIdx = j;
        array[minIdx].state = 'current';
        
        steps.push({
          array: createArraySnapshot(array),
          description: `Found new minimum value ${array[minIdx].value} at position ${minIdx}`
        });
      } else {
        array[j].state = 'default';
      }
    }
    
    // Swap the minimum element with the first element of the unsorted part
    if (minIdx !== i) {
      array[minIdx].state = 'comparing';
      array[i].state = 'comparing';
      
      steps.push({
        array: createArraySnapshot(array),
        description: `Swapping minimum value ${array[minIdx].value} at position ${minIdx} with element at position ${i}`
      });
      
      // Perform swap
      const temp = { ...array[i] };
      array[i] = { ...array[minIdx] };
      array[minIdx] = temp;
      
      array[minIdx].state = 'default';
    }
    
    // Mark the current position as sorted
    array[i].state = 'sorted';
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Element at position ${i} is now in its correct sorted position`
    });
  }
  
  // Mark the last element as sorted
  array[n - 1].state = 'sorted';
  
  steps.push({
    array: createArraySnapshot(array),
    description: 'Selection Sort complete! The array is now fully sorted.'
  });
  
  return steps;
};