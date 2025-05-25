import React from 'react';
import { AlgorithmInfo } from '../types';

interface InfoPanelProps {
  algorithmInfo: AlgorithmInfo;
  darkMode: boolean;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ algorithmInfo, darkMode }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Algorithm Details</h2>
      
      <div className="space-y-4">
        <h3 className="font-medium text-lg">{algorithmInfo.name}</h3>
        
        <div>
          <p className="font-medium mb-1">Description</p>
          <p className="text-sm">{algorithmInfo.description}</p>
        </div>
        
        <div>
          <p className="font-medium mb-1">Time Complexity</p>
          <ul className={`text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-2`}>
            <li className="flex justify-between mb-1">
              <span>Best:</span>
              <span className="font-mono">{algorithmInfo.timeComplexity.best}</span>
            </li>
            <li className="flex justify-between mb-1">
              <span>Average:</span>
              <span className="font-mono">{algorithmInfo.timeComplexity.average}</span>
            </li>
            <li className="flex justify-between">
              <span>Worst:</span>
              <span className="font-mono">{algorithmInfo.timeComplexity.worst}</span>
            </li>
          </ul>
        </div>
        
        <div>
          <p className="font-medium mb-1">Space Complexity</p>
          <p className={`font-mono text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-2`}>
            {algorithmInfo.spaceComplexity}
          </p>
        </div>
        
        <div>
          <p className="font-medium mb-1">Common Use Cases</p>
          <ul className="list-disc list-inside text-sm">
            {algorithmInfo.useCases.map((useCase, index) => (
              <li key={index}>{useCase}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;