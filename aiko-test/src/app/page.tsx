// app/page.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues with Leaflet
const EquipmentMapWithNoSSR = dynamic(
  () => import('../components/EquipmentMap'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <EquipmentMapWithNoSSR />
    </main>
  );
}