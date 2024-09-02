'use client';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
} from 'react-leaflet';
import CustomMarker from '@/components/custom-marker';
import { fetchDashboard } from '@/hooks/useDashboard';
import { Button, MultiSelect, Box, Stack, TextInput } from '@mantine/core';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function HomePage() {
  const [zoom] = useState<number>(10);
  const [center] = useState<Position>([-19.163956, -46.087835]);
  const [style] = useState<React.CSSProperties>({
    height: '500px',
    width: '800px', // Ajuste para encaixar filtros ao lado
    margin: 'auto',
  });

  const [dashboardList, setDashboardList] = useState<any[]>([]);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [modelOptions, setModelOptions] = useState<string[]>([]);

  useEffect(() => {
    const loadDashboard = async () => {
      const data = await fetchDashboard();
      setDashboardList(data);

      // Set distinct state and model options for filters
      const states = new Set<string>();
      const models = new Set<string>();

      data.forEach((item: any) => {
        if (item?.states[0]?.states[0]?.equipmentState?.name) {
          states.add(item.states[0].states[0].equipmentState.name);
        }
        if (item?.equipmentModel?.name) {
          models.add(item.equipmentModel.name);
        }
      });

      setStateOptions([...states]);
      setModelOptions([...models]);
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    if (dashboardList.length > 0) {
      const equipment = dashboardList
        .map((item: any): Equipment | undefined => {
          const positionData = item?.positions[0]?.positions[0];
          if (positionData?.lat && positionData?.lon) {
            const { name: state, color } = item?.states[0]?.states[0]?.equipmentState || {};

            const history: EquipmentHistory[] = item?.states.reduce(
              (acc: EquipmentHistory[], stateGroup: any, i: number) => [
                ...acc,
                ...stateGroup.states.map((stateDetail: any, j: number) => ({
                  state: stateDetail.equipmentState.name,
                  color: stateDetail.equipmentState.color,
                  positions: [
                    item.positions[i]?.positions[j]?.lat,
                    item.positions[i]?.positions[j]?.lon,
                  ],
                })),
              ],
              []
            );

            return {
              _id: item._id.toString(),
              position: [positionData.lat, positionData.lon],
              popupText: item.name,
              color,
              equipmentType: item?.equipmentModel?.name,
              state,
              history,
            };
          }
        })
        .filter((e): e is Equipment => e !== undefined);

      setEquipmentList(equipment);
    }
  }, [dashboardList]);

  const filteredEquipmentList = equipmentList.filter((equipment) => {
    const matchesState = selectedStates.length === 0 || selectedStates.includes(equipment.state);
    const matchesModel = selectedModels.length === 0 || selectedModels.includes(equipment.equipmentType);
    const matchesSearch = searchQuery.length === 0 || equipment.popupText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesModel && matchesSearch;
  });

  const renderHistory = (id: string | null) => {
    if (!id) return null;

    const marker = equipmentList.find((equipment) => equipment._id === id);
    if (!marker || !marker.history) return null;

    // Aplicar os mesmos filtros ao histórico do equipamento
    const filteredHistory = marker.history.filter((item) => {
      const matchesState = selectedStates.length === 0 || selectedStates.includes(item.state);
      const matchesModel = selectedModels.length === 0 || selectedModels.includes(marker.equipmentType);
      return matchesState && matchesModel;
    });

    const validPositions = filteredHistory
      .map((item) => item.positions)
      .filter(
        (pos): pos is Position =>
          Array.isArray(pos) && pos.length === 2 && typeof pos[0] === 'number' && typeof pos[1] === 'number'
      );

    if (validPositions.length === 0) return null;

    return (
      <>
        <Polyline positions={validPositions} color="#000" />
        {filteredHistory.map((item, index) => {
          const { positions, state, color } = item;

          return (
            positions && positions.length === 2 && typeof positions[0] === 'number' && typeof positions[1] === 'number' && (
              <CustomMarker
                key={index}
                position={positions}
                popupText={marker.popupText}
                color={color}
                model={marker.equipmentType}
                state={state}
              />
            )
          );
        })}
      </>
    );
  };

  const handleShowHistory = (id: string) => {
    setSelectedId(selectedId === id ? null : id);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      {/* Filtros à esquerda */}
      <Box sx={{ width: '250px', marginRight: '20px' }}>
        <Stack>
          <TextInput
            label="Pesquisar Equipamento"
            placeholder="Digite o nome do equipamento"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
          />
          <MultiSelect
            data={stateOptions}
            label="Filtrar por Estado"
            placeholder="Selecione estados"
            value={selectedStates}
            onChange={setSelectedStates}
          />
          <MultiSelect
            data={modelOptions}
            label="Filtrar por Modelo"
            placeholder="Selecione modelos"
            value={selectedModels}
            onChange={setSelectedModels}
          />
          <Button onClick={() => { setSelectedStates([]); setSelectedModels([]); setSearchQuery(''); }}>Limpar Filtros</Button>
        </Stack>
      </Box>

      {/* Mapa no centro */}
      <MapContainer center={center} zoom={zoom} style={style}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredEquipmentList.map((equipment) => (
          <CustomMarker
            key={equipment._id}
            position={equipment.position}
            popupText={equipment.popupText}
            color={equipment.color}
            model={equipment.equipmentType}
            state={equipment.state}
            onShowHistory={() => handleShowHistory(equipment._id)}
          />
        ))}
        {renderHistory(selectedId)}
      </MapContainer>

      {/* Filtros à direita - pode adicionar mais opções aqui no futuro */}
      <Box sx={{ width: '250px', marginLeft: '20px' }}>
        <Stack>
          {/* Placeholder para futuros filtros */}
        </Stack>
      </Box>
    </div>
  );
}
