import React, { useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import Header from './components/Header';
import SortingVisualizer from './components/SortingVisualizer';
import ControlPanel from './components/ControlPanel';
import InfoPanel from './components/InfoPanel';
import { Algorithm } from './types';
import { getAlgorithmInfo } from './utils/algorithmInfo';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('bubble');
  const algorithmInfo = getAlgorithmInfo(selectedAlgorithm);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Header />
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-800'} transition-colors duration-200`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
              <SortingVisualizer algorithm={selectedAlgorithm} darkMode={darkMode} />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
              <ControlPanel 
                selectedAlgorithm={selectedAlgorithm} 
                setSelectedAlgorithm={setSelectedAlgorithm}
                darkMode={darkMode}
              />
            </div>
            
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
              <InfoPanel algorithmInfo={algorithmInfo} darkMode={darkMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;