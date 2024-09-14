import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getEquipmentPositions, getImageByModel } from '../utils/equipmentData';
import { EquipmentPosition } from '../types/equipmentTypes';
import L from 'leaflet';
import { useDrawer } from './HistoryDrawer';
import { format } from 'date-fns';
import { getEquipmentTrajectory } from '../utils/filtersData';

// Função para criar um ícone personalizado para o marcador
const createCustomIcon = (modelName: string, stateColor: string) => {
    const iconUrl = getImageByModel(modelName);

    return L.divIcon({
        className: 'custom-icon',
        html: `\
            <div style="\
                background-image: url(${iconUrl});\
                background-size: cover;\
                width: 40px;\
                height: 40px;\
                border-radius: 50%;\
                border: 4px solid ${stateColor};\
            "></div>\
        `,
        iconSize: [40, 40],
    });
};

// Função para criar um ícone personalizado para a localização inicial
const createHighlightIcon = (color: string) => L.divIcon({
    className: 'highlight-icon',
    html: `\
        <div style="\
            background-color: ${color};\
            width: 25px;\
            height: 25px;\
            border-radius: 50%;\
            border: 2px solid white;\
        "></div>\
    `,
    iconSize: [12, 12],
});

export const Map = ({ filters, showTrajectory }: { filters: any, showTrajectory: boolean }) => {
    const [equipmentPositions, setEquipmentPositions] = useState<EquipmentPosition[]>([]);
    const { onOpen } = useDrawer(); 
    const [trajectoryData, setTrajectoryData] = useState<any[]>([]);

    useEffect(() => {
        const fetchTrajectory = async () => {
            if (showTrajectory && filters.equipmentName) {
                try {
                    const data = await getEquipmentTrajectory(filters.equipmentName);
                    setTrajectoryData(data);
                } catch (error) {
                    console.error("Failed to fetch trajectory:", error);
                    setTrajectoryData([]);
                }
            } else {
                setTrajectoryData([]);
            }
        };

        fetchTrajectory();
    }, [showTrajectory, filters.equipmentName]);

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

    // Função para aplicar os filtros
    const filteredPositions = equipmentPositions.filter((equipment) => {
        const matchesSearch = filters.equipmentName === "" || equipment.equipmentName === filters.equipmentName;
        const matchesState = filters.state === "" || equipment.stateName === filters.state;
        const matchesModel = filters.model === "" || equipment.modelName === filters.model;

        return matchesSearch && matchesState && matchesModel;
    });

    return (
        <Box h="100vh" w="100%">
            <MapContainer center={[-19.126536, -45.947756]} zoom={8} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filteredPositions.map((equipment) => (
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
                {showTrajectory && trajectoryData.length > 0 && (
                    <>
                        <Polyline
                            positions={trajectoryData.map((point) => [point.lat, point.lon])}
                            color="blue"
                            weight={3}
                            opacity={0.7}
                        />
                        {trajectoryData.map((point, index) => {
                            // Não adicionar marcador no ponto final
                            if (index === trajectoryData.length - 1) return null;

                            // Destacar o ponto de partida
                            const isStart = index === 0;
                            return (
                                <Marker
                                    key={index}
                                    position={[point.lat, point.lon]}
                                    icon={isStart ? createHighlightIcon('green') : L.divIcon({
                                        className: 'trajectory-icon',
                                        html: `<div style="background-color: #fff70f; width: 8px; height: 8px; border-radius: 50%; border: 1px solid black"></div>`,
                                        iconSize: [20, 20],
                                    })}
                                >
                                    <Popup>
                                        <Text fontSize='md' as='b'>{isStart ? 'Localização inicial' : `Localização ${index + 1}`}</Text><br /><br />
                                        <Text fontSize='sm' as='b'>{format(new Date(point.date), 'dd/MM/yyyy hh:mm')}</Text><br />
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </>
                )}
            </MapContainer>
        </Box>
    );
};
