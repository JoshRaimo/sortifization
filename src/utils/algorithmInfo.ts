import { Algorithm, AlgorithmInfo } from '../types';

export const getAlgorithmInfo = (algorithm: Algorithm): AlgorithmInfo => {
  switch (algorithm) {
    case 'bubble':
      return {
        name: 'Bubble Sort',
        timeComplexity: {
          best: 'O(n)',
          average: 'O(n²)',
          worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        description: 'A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
        useCases: [
          'Educational purposes to understand sorting concepts',
          'Small data sets where simplicity is more important than efficiency',
          'Nearly sorted arrays (with optimized implementation)'
        ]
      };
    
    case 'insertion':
      return {
        name: 'Insertion Sort',
        timeComplexity: {
          best: 'O(n)',
          average: 'O(n²)',
          worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        description: 'Builds the sorted array one item at a time by taking each element from the unsorted portion and inserting it into its correct position in the sorted portion.',
        useCases: [
          'Small data sets or nearly sorted arrays',
          'Online algorithms where data arrives one at a time',
          'Adaptive sorting when most elements are already sorted'
        ]
      };
    
    case 'selection':
      return {
        name: 'Selection Sort',
        timeComplexity: {
          best: 'O(n²)',
          average: 'O(n²)',
          worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        description: 'Repeatedly finds the minimum element from the unsorted part of the array and puts it at the beginning of the unsorted part.',
        useCases: [
          'Small data sets where simplicity is valued',
          'Situations where memory writes are expensive',
          'Educational purposes to understand basic sorting concepts'
        ]
      };
    
    case 'merge':
      return {
        name: 'Merge Sort',
        timeComplexity: {
          best: 'O(n log n)',
          average: 'O(n log n)',
          worst: 'O(n log n)'
        },
        spaceComplexity: 'O(n)',
        description: 'A divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
        useCases: [
          'Large data sets where guaranteed O(n log n) performance is required',
          'External sorting (when data doesn\'t fit in memory)',
          'Linked list sorting (very efficient)'
        ]
      };
    
    case 'quick':
      return {
        name: 'Quick Sort',
        timeComplexity: {
          best: 'O(n log n)',
          average: 'O(n log n)',
          worst: 'O(n²)'
        },
        spaceComplexity: 'O(log n)',
        description: 'A divide-and-conquer algorithm that picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays.',
        useCases: [
          'General-purpose sorting in many programming languages',
          'Large data sets with good average performance',
          'Situations where in-place sorting is beneficial'
        ]
      };
    
    case 'heap':
      return {
        name: 'Heap Sort',
        timeComplexity: {
          best: 'O(n log n)',
          average: 'O(n log n)',
          worst: 'O(n log n)'
        },
        spaceComplexity: 'O(1)',
        description: 'Builds a max heap from the input data, then repeatedly extracts the maximum element from the heap and rebuilds the heap until the array is sorted.',
        useCases: [
          'Systems with real-time constraints due to guaranteed O(n log n) time',
          'Embedded systems with limited memory',
          'Priority queue implementations'
        ]
      };
    
    default:
      return {
        name: 'Unknown Algorithm',
        timeComplexity: {
          best: 'N/A',
          average: 'N/A',
          worst: 'N/A'
        },
        spaceComplexity: 'N/A',
        description: 'Algorithm information not available.',
        useCases: []
      };
  }
};