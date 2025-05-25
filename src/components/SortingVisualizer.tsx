import React, { useState, useEffect, useRef } from 'react';
import { Algorithm, ArrayBar, SortingStep } from '../types';
import { generateRandomArray } from '../utils/arrayHelpers';
import { bubbleSort } from '../algorithms/bubbleSort';
import { insertionSort } from '../algorithms/insertionSort';
import { selectionSort } from '../algorithms/selectionSort';
import { mergeSort } from '../algorithms/mergeSort';
import { quickSort } from '../algorithms/quickSort';
import { heapSort } from '../algorithms/heapSort';

interface SortingVisualizerProps {
  algorithm: Algorithm;
  darkMode: boolean;
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ algorithm, darkMode }) => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [stepDescription, setStepDescription] = useState('');


  const sortingTimeoutRef = useRef<number | null>(null);

  // Generate a new random array when component mounts or arraySize changes
  useEffect(() => {
    resetArray();
  }, [arraySize]);

  // Reset the animation when algorithm changes
  useEffect(() => {
    if (isSorting) {
      if (sortingTimeoutRef.current !== null) {
        clearTimeout(sortingTimeoutRef.current);
      }
      setIsSorting(false);
      setIsPaused(false);
      setCurrentStep(0);
      setSteps([]);
      setStepDescription('');
    }
    resetArray();
  }, [algorithm]);

  // Handle the sorting animation
  useEffect(() => {
    if (isSorting && !isPaused && steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      setArray(step.array);
      setStepDescription(step.description);

      const timeout = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000 - speed * 9);

      sortingTimeoutRef.current = timeout as unknown as number;

      return () => {
        if (sortingTimeoutRef.current !== null) {
          clearTimeout(sortingTimeoutRef.current);
        }
      };
    } else if (currentStep >= steps.length && steps.length > 0) {
      setIsSorting(false);
      setCurrentStep(0);
      setStepDescription('Sorting complete!');
    }
  }, [isSorting, isPaused, currentStep, steps, speed]);

  const resetArray = () => {
    if (isSorting) {
      if (sortingTimeoutRef.current !== null) {
        clearTimeout(sortingTimeoutRef.current);
      }
      setIsSorting(false);
      setIsPaused(false);
    }

    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setStepDescription('');
  };

  const startSorting = () => {
    if (isSorting) {
      setIsPaused(!isPaused);
      return;
    }

    let sortingSteps: SortingStep[] = [];

    switch (algorithm) {
      case 'bubble':
        sortingSteps = bubbleSort([...array]);
        break;
      case 'insertion':
        sortingSteps = insertionSort([...array]);
        break;
      case 'selection':
        sortingSteps = selectionSort([...array]);
        break;
      case 'merge':
        sortingSteps = mergeSort([...array]);
        break;
      case 'quick':
        sortingSteps = quickSort([...array]);
        break;
      case 'heap':
        sortingSteps = heapSort([...array]);
        break;
      default:
        sortingSteps = bubbleSort([...array]);
    }

    setSteps(sortingSteps);
    setCurrentStep(0);
    setIsSorting(true);
    setIsPaused(false);
  };

  const stepForward = () => {
    if (steps.length > 0 && currentStep < steps.length) {
      setIsPaused(true);
      const step = steps[currentStep];
      setArray(step.array);
      setStepDescription(step.description);
      setCurrentStep(prev => prev + 1);
    }
  };

  const stepBackward = () => {
    if (steps.length > 0 && currentStep > 0) {
      setIsPaused(true);
      const step = steps[currentStep - 2 >= 0 ? currentStep - 2 : 0];
      setArray(step.array);
      setStepDescription(step.description);
      setCurrentStep(prev => (prev - 1 > 0 ? prev - 1 : 0));
    }
  };

  const getBarColor = (state: string) => {
    if (darkMode) {
      switch (state) {
        case 'comparing': return 'bg-yellow-400';
        case 'sorted': return 'bg-green-400';
        case 'pivot': return 'bg-red-400';
        case 'current': return 'bg-purple-400';
        default: return 'bg-blue-400';
      }
    } else {
      switch (state) {
        case 'comparing': return 'bg-yellow-500';
        case 'sorted': return 'bg-green-500';
        case 'pivot': return 'bg-red-500';
        case 'current': return 'bg-purple-500';
        default: return 'bg-blue-500';
      }
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Visualization</h2>
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <button 
            onClick={resetArray}
            disabled={isSorting && !isPaused}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
              ${darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} 
              ${(isSorting && !isPaused) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Reset
          </button>
          <button 
            onClick={startSorting}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
              ${darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            {isSorting ? (isPaused ? 'Resume' : 'Pause') : 'Start'}
          </button>
          <button 
            onClick={stepBackward}
            disabled={!steps.length || currentStep <= 1}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
              ${darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} 
              ${(!steps.length || currentStep <= 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Step Back
          </button>
          <button 
            onClick={stepForward}
            disabled={!steps.length || currentStep >= steps.length}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
              ${darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} 
              ${(!steps.length || currentStep >= steps.length) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Step Forward
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium mb-1">Array Size: {arraySize}</label>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={arraySize} 
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={isSorting && !isPaused}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium mb-1">Speed: {speed}%</label>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={speed} 
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {stepDescription && (
        <div className={`p-3 mb-4 rounded-lg text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          {stepDescription}
        </div>
      )}

      <div className="h-64 sm:h-80 md:h-96 flex items-end justify-center border-b border-l relative">
        <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
          {array.map((bar, index) => (
            <div
              key={index}
              className={`w-full ${getBarColor(bar.state)} transition-all duration-200`}
              style={{
                height: `${(bar.value / 100) * 100}%`,
                marginRight: array.length > 60 ? 0 : 1
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 mr-2"></div>
          <span className="text-xs">Unsorted</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 mr-2"></div>
          <span className="text-xs">Comparing</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 mr-2"></div>
          <span className="text-xs">Sorted</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-500 mr-2"></div>
          <span className="text-xs">Current</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 mr-2"></div>
          <span className="text-xs">Pivot</span>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;