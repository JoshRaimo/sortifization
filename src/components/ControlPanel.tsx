import React from 'react';
import { Algorithm } from '../types';

interface ControlPanelProps {
  selectedAlgorithm: Algorithm;
  setSelectedAlgorithm: (algorithm: Algorithm) => void;
  darkMode: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  selectedAlgorithm, 
  setSelectedAlgorithm,
  darkMode
}) => {
  const algorithms = [
    { id: 'bubble', name: 'Bubble Sort' },
    { id: 'insertion', name: 'Insertion Sort' },
    { id: 'selection', name: 'Selection Sort' },
    { id: 'merge', name: 'Merge Sort' },
    { id: 'quick', name: 'Quick Sort' },
    { id: 'heap', name: 'Heap Sort' }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Algorithms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {algorithms.map((algo) => (
          <button
            key={algo.id}
            onClick={() => setSelectedAlgorithm(algo.id as Algorithm)}
            className={`px-4 py-3 rounded-lg transition-all text-left ${
              selectedAlgorithm === algo.id
                ? darkMode 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-500 text-white'
                : darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {algo.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;