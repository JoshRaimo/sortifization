import { ArrayBar, SortingStep } from '../types';
import { createArraySnapshot } from '../utils/arrayHelpers';

export const heapSort = (array: ArrayBar[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const n = array.length;
  
  // Initial state
  steps.push({
    array: createArraySnapshot(array),
    description: 'Starting heap sort. First, we will build a max heap from the array.'
  });
  
  // Build max heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, steps);
  }
  
  steps.push({
    array: createArraySnapshot(array),
    description: 'Max heap built successfully. Now we will extract elements one by one from the heap.'
  });
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    array[0].state = 'comparing';
    array[i].state = 'comparing';
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Swapping root (max element) ${array[0].value} with last unsorted element ${array[i].value}`
    });
    
    // Swap
    const temp = { ...array[0] };
    array[0] = { ...array[i] };
    array[i] = temp;
    
    // Mark the current position as sorted
    array[i].state = 'sorted';
    array[0].state = 'default';
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Element ${array[i].value} is now in its correct sorted position at index ${i}`
    });
    
    // Call heapify on the reduced heap
    heapify(array, i, 0, steps);
  }
  
  // Mark the first element as sorted (it's the only one left)
  array[0].state = 'sorted';
  
  steps.push({
    array: createArraySnapshot(array),
    description: 'Heap Sort complete! The array is now fully sorted.'
  });
  
  return steps;
};

const heapify = (
  array: ArrayBar[],
  n: number,
  rootIndex: number,
  steps: SortingStep[]
): void => {
  // Initialize largest as root
  let largest = rootIndex;
  const left = 2 * rootIndex + 1;
  const right = 2 * rootIndex + 2;
  
  array[rootIndex].state = 'current';
  
  steps.push({
    array: createArraySnapshot(array),
    description: `Heapifying subtree with root at index ${rootIndex}`
  });
  
  // If left child is larger than root
  if (left < n) {
    array[left].state = 'comparing';
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Comparing left child ${array[left].value} at index ${left} with current largest ${array[largest].value} at index ${largest}`
    });
    
    if (array[left].value > array[largest].value) {
      if (largest !== rootIndex) {
        array[largest].state = 'default';
      }
      
      largest = left;
      
      steps.push({
        array: createArraySnapshot(array),
        description: `Left child is larger, new largest is at index ${largest} with value ${array[largest].value}`
      });
    }
    
    if (largest !== left) {
      array[left].state = 'default';
    }
  }
  
  // If right child is larger than largest so far
  if (right < n) {
    array[right].state = 'comparing';
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Comparing right child ${array[right].value} at index ${right} with current largest ${array[largest].value} at index ${largest}`
    });
    
    if (array[right].value > array[largest].value) {
      if (largest !== rootIndex && largest !== left) {
        array[largest].state = 'default';
      }
      
      largest = right;
      
      steps.push({
        array: createArraySnapshot(array),
        description: `Right child is larger, new largest is at index ${largest} with value ${array[largest].value}`
      });
    }
    
    if (largest !== right) {
      array[right].state = 'default';
    }
  }
  
  // If largest is not root
  if (largest !== rootIndex) {
    array[rootIndex].state = 'comparing';
    array[largest].state = 'comparing';
    
    steps.push({
      array: createArraySnapshot(array),
      description: `Swapping root ${array[rootIndex].value} with largest ${array[largest].value}`
    });
    
    // Swap
    const temp = { ...array[rootIndex] };
    array[rootIndex] = { ...array[largest] };
    array[largest] = temp;
    
    array[rootIndex].state = 'default';
    array[largest].state = 'default';
    
    // Recursively heapify the affected sub-tree
    heapify(array, n, largest, steps);
  } else {
    array[rootIndex].state = 'default';
  }
};