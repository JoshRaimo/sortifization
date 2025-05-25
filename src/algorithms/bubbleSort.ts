import { ArrayBar, SortingStep } from '../types';
import { createArraySnapshot } from '../utils/arrayHelpers';

export const bubbleSort = (array: ArrayBar[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const n = array.length;
  let swapped: boolean;
  
  // Initial state
  steps.push({
    array: createArraySnapshot(array),
    description: 'Starting bubble sort. We will compare adjacent elements and swap them if they are in the wrong order.'
  });
  
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Mark elements being compared
      array[j].state = 'comparing';
      array[j + 1].state = 'comparing';
      
      steps.push({
        array: createArraySnapshot(array),
        description: `Comparing elements at positions ${j} and ${j + 1}`
      });
      
      // Compare and swap if needed
      if (array[j].value > array[j + 1].value) {
        // Perform swap
        const temp = { ...array[j] };
        array[j] = { ...array[j + 1] };
        array[j + 1] = temp;
        
        swapped = true;
        
        steps.push({
          array: createArraySnapshot(array),
          description: `Swapped elements at positions ${j} and ${j + 1} because ${array[j].value} < ${array[j + 1].value}`
        });
      } else {
        steps.push({
          array: createArraySnapshot(array),
          description: `No swap needed as elements are already in order: ${array[j].value} <= ${array[j + 1].value}`
        });
      }
      
      // Reset comparing state
      array[j].state = 'default';
      array[j + 1].state = 'default';
    }
    
    // Mark the last element as sorted after each pass
    array[n - i - 1].state = 'sorted';
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Element at position ${n - i - 1} is now in its correct sorted position`
    });
    
    // If no swapping occurred in this pass, the array is already sorted
    if (!swapped) {
      // Mark all remaining elements as sorted
      for (let k = 0; k < n - i - 1; k++) {
        array[k].state = 'sorted';
      }
      
      steps.push({
        array: createArraySnapshot(array),
        description: 'No swaps occurred in this pass, which means the array is now sorted!'
      });
      
      break;
    }
  }
  
  // Final state - all elements should be sorted
  for (let i = 0; i < array.length; i++) {
    array[i].state = 'sorted';
  }
  
  steps.push({
    array: createArraySnapshot(array),
    description: 'Bubble Sort complete! The array is now fully sorted.'
  });
  
  return steps;
};