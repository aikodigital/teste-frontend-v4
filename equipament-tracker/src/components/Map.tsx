import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getEquipmentPositions, getImageByModel } from '../utils/equipmentData';
import { EquipmentPosition } from '../types/equipmentTypes';
import L from 'leaflet';
import { useDrawer } from './HistoryDrawer';
import { format } from 'date-fns';

// Função para criar um ícone personalizado para o marcador
const createCustomIcon = (modelName: string, stateColor: string) => {
    const iconUrl = getImageByModel(modelName);

    return L.divIcon({
        className: 'custom-icon',
        html: `
            <div style="
                background-image: url(${iconUrl});
                background-size: cover;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 4px solid ${stateColor};
            "></div>
        `,
        iconSize: [40, 40],
    });
};

export const Map = () => {
    const [equipmentPositions, setEquipmentPositions] = useState<EquipmentPosition[]>([]);
    const { onOpen } = useDrawer(); 

    useEffect(() => {
        const fetchPositions = async () => {
            const data = await getEquipmentPositions();
            setEquipmentPositions(data);
        };
        fetchPositions();
    }, []);

    const handleOpenDrawer = (equipment: EquipmentPosition) => {
        onOpen(equipment);
    };

    return (
        <Box h="100vh" w="100%">
            <MapContainer center={[-19.126536, -45.947756]} zoom={8} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {equipmentPositions.map((equipment) => (
                    <Marker
                        key={equipment.id}
                        position={[equipment.lat, equipment.lon]}
                        icon={createCustomIcon(equipment.modelName, equipment.stateColor)}
                    >
                        <Popup>
                            <Text fontSize='2xl' as='b'>{equipment.equipmentName}</Text><br /><br />
                            <Text fontSize='lg' as='b'>{equipment.modelName}</Text><br /><br />
                            <Text fontSize='md' as='b'>{equipment.stateName}</Text><br /><br />
                            <Text fontSize='md' as='b'>{format(new Date(equipment.date), 'dd/MM/yyyy hh:mm')}</Text><br />
                            <Button mt={2} colorScheme='teal' onClick={() => handleOpenDrawer(equipment)}>
                                Ver Histórico
                            </Button>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Box>
    );
};
