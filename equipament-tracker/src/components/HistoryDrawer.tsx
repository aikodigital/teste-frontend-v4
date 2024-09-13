import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { EquipmentPosition } from '../types/equipmentTypes';
import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Box, Text, List, ListItem } from '@chakra-ui/react';
import { getEquipmentStateHistory } from '../utils/equipmentData';
import { format } from 'date-fns';

interface DrawerContextType {
    isOpen: boolean;
    onOpen: (equipment: EquipmentPosition) => void;
    onClose: () => void;
    selectedEquipment: EquipmentPosition | null;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentPosition | null>(null);
    const [stateHistory, setStateHistory] = useState<any[]>([]);

    const onOpen = (equipment: EquipmentPosition) => {
        setSelectedEquipment(equipment);
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
        setSelectedEquipment(null);
    };

    useEffect(() => {
        if (selectedEquipment) {
            const history = getEquipmentStateHistory(selectedEquipment.id);
            setStateHistory(history);
        }
    }, [selectedEquipment]);

    return (
        <DrawerContext.Provider value={{ isOpen, onOpen, onClose, selectedEquipment }}>
            {children}
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size="lg"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Text fontSize="lg" fontWeight="bold">
                            {selectedEquipment?.equipmentName || 'Detalhes do Equipamento'}
                        </Text>
                    </DrawerHeader>

                    <DrawerBody>
                        <Box mb={4}>
                            <Text fontWeight="bold">Última atualização:</Text>
                            <Text>
                                {selectedEquipment?.date
                                    ? format(new Date(selectedEquipment.date), 'dd/MM/yyy hh:mm')
                                    : 'Data não disponível'
                                }
                            </Text>
                        </Box>
                        <Box mb={4}>
                            <Text fontWeight="bold">Estado:</Text>
                            <Text>{selectedEquipment?.stateName}</Text>
                        </Box>
                        <Box mb={4}>
                            <Text fontWeight="bold">Modelo:</Text>
                            <Text>{selectedEquipment?.modelName}</Text>
                        </Box>
                        <Box>
                            <Text fontSize="lg" fontWeight="bold" mb={2}>Histórico de Estados:</Text>
                            {stateHistory.length > 0 ? (
                                <List spacing={3}>
                                    {stateHistory.map((historyItem, index) => (
                                        <ListItem key={index} p={3} borderWidth={1} borderRadius="md" shadow="md">
                                            <Text><strong>Data:</strong> {format(new Date(historyItem.date), 'dd/MM/yyyy hh:mm')}</Text>
                                            <Text><strong>Estado:</strong> {historyItem.state}</Text>
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Text>Nenhum histórico disponível.</Text>
                            )}
                        </Box>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Fechar
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </DrawerContext.Provider>
    );
};

export const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (context === undefined) {
        throw new Error('useDrawer must be used within a DrawerProvider');
    }
    return context;
};
