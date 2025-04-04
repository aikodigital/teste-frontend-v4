import { Box, CircularProgress } from '@mui/material';
import { EquipmentList } from './components/EquipmentList';
import { Map } from './components/Map';
import { Header } from './components/Header';
import { useState, useEffect } from 'react';
import { Equipment, EquipmentWithDetails } from './types';
import { getEquipmentWithDetails } from './services/equipmentService';
import equipmentsData from './data/equipment.json';

function App() {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState<EquipmentWithDetails[]>([]);
  const [filteredEquipments, setFilteredEquipments] = useState<EquipmentWithDetails[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentWithDetails | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Usando os dados do JSON diretamente
        const equipmentsBase: Equipment[] = equipmentsData;
        
        // Carregando detalhes para cada equipamento
        const equipmentsWithDetails = await Promise.all(
          equipmentsBase.map(equipment => getEquipmentWithDetails(equipment))
        );

        setEquipments(equipmentsWithDetails);
        setFilteredEquipments(equipmentsWithDetails);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFilterChange = (searchText: string) => {
    const filtered = equipments.filter(equipment =>
      equipment.name.toLowerCase().includes(searchText.toLowerCase()) ||
      equipment.model?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredEquipments(filtered);
  };

  const handleEquipmentSelect = (equipmentId: string) => {
    if (!equipmentId) {
      setFilteredEquipments(equipments);
      setSelectedEquipment(null);
      return;
    }
    
    const filtered = equipments.filter(equipment => equipment.id === equipmentId);
    setFilteredEquipments(filtered);
    
    // Seleciona o equipamento no mapa
    const selected = equipments.find(eq => eq.id === equipmentId);
    if (selected) {
      setSelectedEquipment(selected);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header 
        equipments={equipments}
        onFilterChange={handleFilterChange}
        onEquipmentSelect={handleEquipmentSelect}
      />
      
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box sx={{ width: '30%', borderRight: 1, borderColor: 'divider' }}>
          <EquipmentList 
            equipments={filteredEquipments}
            selectedEquipment={selectedEquipment}
            onSelectEquipment={setSelectedEquipment}
          />
        </Box>
        <Box sx={{ width: '70%' }}>
          <Map 
            equipments={filteredEquipments}
            selectedEquipment={selectedEquipment}
            onSelectEquipment={setSelectedEquipment}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default App;