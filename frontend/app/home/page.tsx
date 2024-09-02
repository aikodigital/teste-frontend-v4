'use client';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';
import CustomMarker from '@/components/custom-marker';
import { fetchDashboard } from '@/hooks/useDashboard';
import { Button, MultiSelect, Box, Stack, TextInput } from '@mantine/core';
import { fetchStates } from '@/hooks/useStates';
import { fetchModels } from '@/hooks/useModels';
import { fetchEquipment } from '@/hooks/useEquipment';

delete (L.Icon.Default.prototype as any)._getIconUrl;

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
    height: '100vh',
    width: '100%',
  });

  const [dashboardList, setDashboardList] = useState<any[]>([]);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedEquipmentQuery, setSelectedEquipmentQuery] = useState<
    string[]
  >([]);
  const [equipmentQueryList, setEquipmentQueryList] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [modelOptions, setModelOptions] = useState<string[]>([]);

  useEffect(() => {
    const loadEquipment = async () => {
      const equipment = new Set<string>();
      const data = await fetchEquipment();
      data.forEach((item: any) => {
        if (item?.name) {
          equipment.add(item?.name);
        }
      });
      setEquipmentQueryList(Array.from(equipment));
    };

    const loadStates = async () => {
      const states = new Set<string>();
      const data = await fetchStates();
      data.forEach((item: any) => {
        if (item?.name) {
          states.add(item?.name);
        }
      });
      setStateOptions(Array.from(states));
    };
    const loadModels = async () => {
      const models = new Set<string>();
      const data = await fetchModels();
      data.forEach((item: any) => {
        if (item?.name) {
          models.add(item?.name);
        }
      });
      setModelOptions(Array.from(models));
    };
    const loadDashboard = async () => {
      const data = await fetchDashboard();
      setDashboardList(data);
    };

    loadStates();
    loadModels();
    loadEquipment();
    loadDashboard();
  }, []);

  useEffect(() => {
    if (dashboardList.length > 0) {
      const equipment = dashboardList
        .map((item: any): Equipment | undefined => {
          const positionData = item?.positions[0]?.positions[0];
          if (positionData?.lat && positionData?.lon) {
            const { name: state, color } =
              item?.states[0]?.states[0]?.equipmentState || {};

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
              productivity: item.productivityPercentage.toFixed(2),
            };
          }
        })
        .filter((e): e is Equipment => e !== undefined);

      setEquipmentList(equipment);
    }
  }, [dashboardList]);

  const filteredEquipmentList = equipmentList.filter((equipment) => {
    const matchesState =
      selectedStates.length === 0 || selectedStates.includes(equipment.state);
    const matchesModel =
      selectedModels.length === 0 ||
      selectedModels.includes(equipment.equipmentType);
    const matchesSearch =
      searchQuery.length === 0 ||
      equipment.popupText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEquipment =
      selectedEquipmentQuery.length === 0 ||
      selectedEquipmentQuery.includes(equipment.popupText);

    return matchesState && matchesModel && matchesSearch && matchesEquipment;
  });

  const renderHistory = (id: string | null) => {
    if (!id) return null;

    const marker = equipmentList.find((equipment) => equipment._id === id);
    if (!marker || !marker.history) return null;

    const filteredHistory = marker.history.filter((item) => {
      const matchesState =
        selectedStates.length === 0 || selectedStates.includes(item.state);
      const matchesModel =
        selectedModels.length === 0 ||
        selectedModels.includes(marker.equipmentType);
      return matchesState && matchesModel;
    });

    const validPositions = filteredHistory
      .map((item) => item.positions)
      .filter(
        (pos): pos is Position =>
          Array.isArray(pos) &&
          pos.length === 2 &&
          typeof pos[0] === 'number' &&
          typeof pos[1] === 'number'
      );

    if (validPositions.length === 0) return null;

    return (
      <>
        <Polyline positions={validPositions} color="#000" />
        {filteredHistory.map((item, index) => {
          const { positions, state, color } = item;

          return (
            positions &&
            positions.length === 2 &&
            typeof positions[0] === 'number' &&
            typeof positions[1] === 'number' && (
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
    <div
      style={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <div style={{ width: '70%', height: '100%' }}>
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
      </div>

      <Box
        style={{
          width: '30%',
          padding: '20px',
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <Stack gap="md">
          <TextInput
            label="Pesquisar Equipamento"
            placeholder="Digite o nome do equipamento"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
          />
          <MultiSelect
            data={equipmentQueryList}
            label="Filtrar por Equipamento"
            placeholder="Selecione equipamentos"
            value={selectedEquipmentQuery}
            onChange={setSelectedEquipmentQuery}
            width={300}
            maxDropdownHeight={300}
            styles={{
              input: {
                maxWidth: '400px',
              },
            }}
            clearable={true}
          />
          <MultiSelect
            data={stateOptions}
            label="Filtrar por Estado"
            placeholder="Selecione estados"
            value={selectedStates}
            onChange={setSelectedStates}
            width={300}
            styles={{
              input: {
                maxWidth: '400px',
              },
            }}
            maxDropdownHeight={300}
            clearable={true}
          />
          <MultiSelect
            data={modelOptions}
            label="Filtrar por Modelo"
            placeholder="Selecione modelos"
            value={selectedModels}
            onChange={setSelectedModels}
            width={300}
            styles={{
              input: {
                maxWidth: '400px',
              },
            }}
            maxDropdownHeight={300}
            clearable={true}
          />
          <Button
            onClick={() => {
              setSelectedStates([]);
              setSelectedModels([]);
              setSearchQuery('');
              setSelectedEquipmentQuery([]);
            }}
          >
            Limpar Filtros
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
