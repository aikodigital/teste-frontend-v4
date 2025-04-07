// components/StateIndicator.tsx

import React from 'react';
import { EquipmentState } from '../types';

interface StateIndicatorProps {
  state: EquipmentState;
  size?: 'sm' | 'md' | 'lg';
}

const StateIndicator: React.FC<StateIndicatorProps> = ({ state, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-3 h-3 mr-1',
    md: 'w-4 h-4 mr-2',
    lg: 'w-6 h-6 mr-2'
  };
  
  return (
    <div className="flex items-center">
      <div 
        className={`rounded-full ${sizeClasses[size]}`} 
        style={{ backgroundColor: state.color }}
      />
      <span>{state.name}</span>
    </div>
  );
};

export default StateIndicator;