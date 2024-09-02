import React from 'react';
import Map from './Map';

interface MapContainerProps {
    onEquipmentClick: (equipmentId: string) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ onEquipmentClick }) => {
    return (
        <section className="w-full h-full bg-white">
            <Map onEquipmentClick={onEquipmentClick} />
        </section>
    );
};

export default MapContainer;
