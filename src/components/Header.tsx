import React from 'react';
import { BarChartBigIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <BarChartBigIcon className="h-8 w-8 text-blue-500" />
      <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        Sortifization
      </h1>
    </div>
  );
};

export default Header;