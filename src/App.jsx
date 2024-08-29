import { Button, Container, Divider, ScrollArea, Stack, Text, Title } from "@mantine/core";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import PositionMarker from "./components/PositionMarker";
import { useData } from "./context/DataContext";
import "./index.css";

export default function App() {
  const {
    equipmentPositionHistory,
    equipmentBasicData,
    equipmentModel,
    equipmentState,
    equipmentStateHistory,
    loading,
    error,
  } = useData();
  const [equipments, setEquipments] = useState([]);
  const [showStateHistory, setShowStateHistory] = useState(false);
  const [trajectoryMarkers, setTrajectoryMarkers] = useState([]);
  const initialMapPosition =
    equipmentPositionHistory.length > 0
      ? [equipmentPositionHistory[0].positions[0].lat, equipmentPositionHistory[0].positions[0].lon]
      : [-19.167338, -46.00347];

  const formatDateAndTime = (unformattedDateString) => {
    const date = new Date(unformattedDateString);

    const readableDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "America/Sao_Paulo",
    });

    const readableTime = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Sao_Paulo",
    });

    return `${readableDate}, ${readableTime}`;
  };

  const createIconDynamically = (color) => {
    return L.divIcon({
      html: `<div style="width: 38px; height: 38px; margin-top: -24px; margin-left: -14px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${
        color ? color : "blue"
      }" width="38px" height="38px">
<path d="M12 2C8.1 2 5 5.1 5 9c0 3.9 7 13 7 13s7-9.1 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
</svg></div>`,
    });
  };

  const toggleStateHistory = () => {
    setShowStateHistory(!showStateHistory);
  };

  const renderStateName = (stateId) => {
    switch (stateId) {
      case "0808344c-454b-4c36-89e8-d7687e692d57":
        return "Operando";
      case "baff9783-84e8-4e01-874b-6fd743b875ad":
        return "Parado";
      case "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f":
        return "Manutenção";
      default:
        return "Não especificado";
    }
  };

  const handleEquipmentTrajectory = (equipmentIdToBeFound) => {
    const selectedEquipment = equipmentPositionHistory.find(
      (equipment) => equipment.equipmentId === equipmentIdToBeFound
    );

    setTrajectoryMarkers(selectedEquipment);
  };

  useEffect(() => {
    const basicEquipmentData = equipmentBasicData.map((equipment) => {
      return {
        id: equipment.id,
        name: equipment.name,
        modelId: equipment.equipmentModelId,
      };
    });

    const equipmentWithPositions = equipmentPositionHistory.map((equipment, index) => {
      return {
        ...basicEquipmentData[index],
        lastKnownPosition:
          equipment.positions?.length > 0
            ? {
                coordinates: [equipment.positions[0].lat, equipment.positions[0].lon],
                date: equipment.positions[equipment.positions.length - 1].date,
              }
            : null,
      };
    });

    const equipmentWithStates = equipmentStateHistory.map((equipment, index) => {
      const { name: stateName, color } = equipmentState.find(
        (equipmentState) => equipment.states[0].equipmentStateId === equipmentState.id
      );

      return {
        ...equipmentWithPositions[index],
        lastKnownState:
          equipment.states?.length > 0
            ? { date: equipment.states[equipment.states.length - 1].date, name: stateName, color }
            : null,
        states: equipment.states,
      };
    });

    const equipmentWithModels = equipmentWithStates.map((equipment, index) => {
      const { name: modelName } = equipmentModel.find((equipmentModel) => equipmentModel.id === equipment.modelId);

      return {
        ...equipmentWithStates[index],
        modelName,
      };
    });

    setEquipments(equipmentWithModels);
  }, [equipmentBasicData, equipmentModel, equipmentPositionHistory, equipmentState, equipmentStateHistory]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <MapContainer center={initialMapPosition} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <PositionMarker data={trajectoryMarkers} />
      {equipments.length > 0 &&
        equipments.map((equipment) => (
          <Marker
            key={equipment.id}
            position={equipment.lastKnownPosition.coordinates}
            icon={createIconDynamically(equipment.lastKnownState.color)}
          >
            <Popup>
              <Stack spacing="md">
                <Stack spacing={6}>
                  <Container>
                    <Title order={1} size="h3">
                      {equipment.name}
                    </Title>
                  </Container>
                  <Container>
                    <Title order={2} size="h6">
                      {equipment.modelName}
                    </Title>
                  </Container>
                </Stack>

                <Divider orientation="horizontal" />

                <Stack spacing={8}>
                  <Text weight={700} ta="center">
                    Última posição conhecida
                  </Text>
                  <Text>
                    Latitude: {equipment.lastKnownPosition.coordinates[0]}, longitude:
                    {equipment.lastKnownPosition.coordinates[1]}
                  </Text>
                  <Text>Data e hora: {formatDateAndTime(equipment.lastKnownPosition.date)}</Text>
                </Stack>

                <Divider orientation="horizontal" />

                <Stack spacing={8}>
                  <Text weight={700} ta="center">
                    Último estado conhecido
                  </Text>
                  <Text>Nome: {equipment.lastKnownState.name}</Text>
                  <Text>Data e hora: {formatDateAndTime(equipment.lastKnownState.date)}</Text>
                </Stack>

                <Divider orientation="horizontal" />

                <Button onClick={() => toggleStateHistory()}>
                  {showStateHistory ? "Fechar histórico de estados" : "Ver histórico de estados"}
                </Button>
                {showStateHistory && (
                  <ScrollArea h={200}>
                    {equipment.states.map((state) => {
                      return (
                        <Stack
                          key={state.id}
                          pb={8}
                          mb={16}
                          spacing="xs"
                          sx={{
                            borderBottom: "1px solid black",
                          }}
                        >
                          <Text>Nome: {renderStateName(state.equipmentStateId)}</Text>
                          <Text>Data e hora: {formatDateAndTime(state.date)}</Text>
                        </Stack>
                      );
                    })}
                  </ScrollArea>
                )}
                <Button onClick={() => handleEquipmentTrajectory(equipment.id)}>Ver trajetória do equipamento</Button>
              </Stack>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
