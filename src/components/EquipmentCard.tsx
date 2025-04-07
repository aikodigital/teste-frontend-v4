import React from 'react';
import { Link } from 'react-router-dom';
import { Truck } from 'lucide-react';
import type { Equipment, EquipmentState } from '../types/equipment';

interface EquipmentCardProps {
  equipment: Equipment;
  currentState: EquipmentState | null;
}

export function EquipmentCard({ equipment, currentState }: EquipmentCardProps) {
  return (
    <Link
      to={`/equipment/${equipment.id}`}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-3">
        <Truck className="h-8 w-8 text-gray-600" />
        <div>
          <h3 className="text-lg font-semibold">{equipment.name}</h3>
          {currentState && (
            <span
              className="inline-block px-2 py-1 rounded text-white text-sm mt-1"
              style={{ backgroundColor: currentState.color }}
            >
              {currentState.name}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}