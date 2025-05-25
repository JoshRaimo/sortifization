export type Algorithm = 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick' | 'heap';

export interface ArrayBar {
  value: number;
  state: 'default' | 'comparing' | 'sorted' | 'pivot' | 'current';
}

export interface AlgorithmInfo {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
  useCases: string[];
}

export interface SortingStep {
  array: ArrayBar[];
  description: string;
}