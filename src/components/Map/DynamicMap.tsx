"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

export interface DynamicToolMapProps {
  isShowingHistory: boolean;
  onMarkerClick: () => void;
}

// Dynamically import the ToolMap component with no SSR
const DynamicToolMap = dynamic<DynamicToolMapProps>(() => import('./Map'), { ssr: false });

export default DynamicToolMap;