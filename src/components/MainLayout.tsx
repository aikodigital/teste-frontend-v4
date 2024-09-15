import React, { useState, useMemo, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import CustomAppBar from './CustomAppBar';
import EquipmentMap from './EquipmentMap';
import SideMenu from './SideMenu';
import { Equipment, EquipmentState } from '../types/sharedTypes';

const LayoutContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
});

const ContentContainer = styled('div')({
  display: 'flex',
  flexGrow: 1,
  overflow: 'hidden',
});

const MapContainer = styled('div')({
  flexGrow: 1,
  position: 'relative',
  overflow: 'hidden',
});

interface MainLayoutProps {
  equipments: Equipment[];
  userName: string;
  equipmentStates: EquipmentState[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ equipments, userName, equipmentStates }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{ [key: string]: boolean }>({
    active: true,
    inactive: true,
  });

  const equipmentTypes = useMemo(() => {
    return Array.from(new Set(equipments.map((eq) => eq.model)));
  }, [equipments]);

  useEffect(() => {
    const initialFilters = {
      active: true,
      inactive: true,
      ...equipmentTypes.reduce((acc, type) => ({ ...acc, [type]: true }), {}),
    };
    setFilters(initialFilters);
  }, [equipmentTypes]);

  const filteredEquipments = useMemo(() => {
    return equipments.filter((eq) => {
      const matchesSearch =
        eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filters[eq.model] !== false;
      const matchesStatus =
        (filters.active && eq.latestState?.name !== 'Manutenção') ||
        (filters.inactive && eq.latestState?.name === 'Manutenção');
      return matchesSearch && matchesFilter && matchesStatus;
    });
  }, [equipments, searchTerm, filters]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: { [key: string]: boolean }) => {
    setFilters(newFilters);
  };

  const handleExportCSV = () => {
    const headers = ['Código', 'Modelo', 'Estado', 'Produtividade', 'Ganhos'];
    const csvContent = filteredEquipments.map((eq) => [
      eq.name,
      eq.model,
      eq.latestState?.name || 'Desconhecido',
      eq.productivity.toFixed(2),
      eq.earnings.toFixed(2),
    ]);

    const csvString = [headers.join(','), ...csvContent.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'equipamentos.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <LayoutContainer>
      <CustomAppBar userName={userName} />
      <ContentContainer>
        <SideMenu
          equipmentTypes={equipmentTypes}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          initialFilters={filters}
          onExportCSV={handleExportCSV}
        />
        <MapContainer>
          <EquipmentMap equipments={filteredEquipments} equipmentStates={equipmentStates} />
        </MapContainer>
      </ContentContainer>
    </LayoutContainer>
  );
};

export default MainLayout;
