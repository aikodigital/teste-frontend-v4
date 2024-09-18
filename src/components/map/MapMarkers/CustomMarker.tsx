import React from 'react';
import { OverlayView } from '@react-google-maps/api';
import {
  Agriculture,
  Construction,
  HelpOutline,
  LocalShipping,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import styles from './CustomMarker.module.scss';
import { selectAllStates } from '../../../store/selectors';

interface CustomMarkerProps {
  position: google.maps.LatLngLiteral;
  modelId: string | null;
  stateId: string | null;
  onClick: () => void;
}

export interface IMarker {
  id: string;
  name: string;
  position: google.maps.LatLngLiteral;
  modelId: string | null;
  stateId: string | null;
}

const equipmentIconMap: { [key: string]: React.ReactNode } = {
  'a3540227-2f0e-4362-9517-92f41dabbfdf': <LocalShipping fontSize="large" />, // Caminhão de carga
  'a4b0c114-acd8-4151-9449-7d12ab9bf40f': <Agriculture fontSize="large" />, // Harvester
  '9c3d009e-0d42-4a6e-9036-193e9bca3199': <Construction fontSize="large" />, // Garra traçadora
};

const CustomMarker: React.FC<CustomMarkerProps> = React.memo(
  ({ position, onClick, modelId, stateId }) => {
    const stateIcon = useSelector(selectAllStates).find(
      (item) => item.id === stateId
    );

    // Determine the icon to use based on the modelId
    const Icon = modelId ? (
      equipmentIconMap[modelId]
    ) : (
      <HelpOutline fontSize="large" />
    );

    return (
      <OverlayView
        position={position}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          className={styles.markerIcon}
          onClick={onClick}
          style={{
            cursor: 'pointer',
            transform: 'translate(-50%, -50%)',
            color: stateIcon?.color ?? '#0000FF',
          }}
        >
          {Icon}
        </div>
      </OverlayView>
    );
  }
);

export default CustomMarker;
