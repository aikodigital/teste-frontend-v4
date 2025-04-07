// app/page.tsx
'use client';

import EquipmentStateHistory from '@/src/components/EquipmentStateHistory';
import { useStore } from '@/src/lib/zustand/store';
import React from 'react';


export default function StateHistory() {
  const { selectedEquipmentId, selectEquipment } = useStore()
  return (
      <EquipmentStateHistory 
        equipmentId={selectedEquipmentId!} 
        onClose={() => selectEquipment(null)} 
      />
  )
}