import React, { useEffect, useState } from "react";
import { Map } from "../components/map/index.tsx";
import { Equipment } from "../components/equipament/index.tsx";
import equipmentData from "../data/equipment.json";
import equipmentModelData from "../data/equipmentModel.json";
import equipmentStateData from "../data/equipmentState.json";
import equipmentStateHistory from "../data/equipmentStateHistory.json";
import equipmentPositionHistory from "../data/equipmentPositionHistory.json";
import { HomeContainer, Containt } from "./Home.styles.ts";
import { Modal } from "../components/common/Modal"; 


import { Button } from "../components/common/Button/index.tsx";

// Interfaces para tipagem
interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

interface HourlyEarnings {
  equipmentStateId: string;
  value: number;
}

interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarnings[];
}

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface ProcessedEquipment extends Equipment {
  modelName: string;
  hourlyEarnings: {
    equipmentStateId: string;
    value: number;
    stateName: string;
    stateColor: string;
  }[];
  lastState: {
    stateName: string;
    stateColor: string;
    date: string | null;
  };
  lastPosition: {
    lat: number;
    lon: number;
    date: string;
  } | null;
}

export function Home() {
  const [processedData, setProcessedData] = useState<ProcessedEquipment[]>([]);
  const [view, setView] = useState<"map" | "cards">("map"); // Estado para alternar entre mapa e cards

  useEffect(() => {
    // Processar os dados ao carregar o componente
    const data = processEquipmentData(
      equipmentData,
      equipmentModelData,
      equipmentStateData,
      equipmentStateHistory,
      equipmentPositionHistory
    );
    setProcessedData(data);
  }, []);

  // Extrair as últimas posições dos equipamentos
  const equipmentPositions = processedData.filter((equipment) => equipment.lastPosition) // Filtrar equipamentos com posição válida
    .map((equipment) => ({
      id: equipment.id,
      name: equipment.name,
      lat: equipment.lastPosition!.lat,
      lon: equipment.lastPosition!.lon,
      lastState: equipment.lastState,
    }));

    const [selectedEquipment, setSelectedEquipment] = useState<ProcessedEquipment | null>(null);

    const handleEquipmentClick = (equipment: ProcessedEquipment) => {
      setSelectedEquipment(equipment); // Define o equipamento selecionado
    };
  
    const closeModal = () => {
      setSelectedEquipment(null); // Fecha o modal
    };

  return (
    <HomeContainer>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#00B37E", fontWeight: "bold", marginBottom: "0.8rem" }}>
          Bem-vindo ao Painel de Equipamentos
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Visualize o status e a localização dos seus equipamentos em tempo real.
        </p>
      </header>

      <hr style={{ width: "50%", marginLeft: "25%", marginTop: "-1rem", opacity: "50%"}}/>

      {/* Botões para alternar entre mapa e cards */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", justifyContent: "center" }}>
        <Button onClick={() => setView("map")}>Ver Mapa</Button>
        <Button onClick={() => setView("cards")}>Ver Equipamentos</Button>
      </div>

      <Containt>
        {/* Renderização condicional */}
        {view === "map" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "3rem"}}>
            <h2>Mapa</h2>
            <Map
              equipmentPositions={equipmentPositions}
            />
          </div>
        )}
        {view === "cards" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h2>Equipamentos</h2>
            {processedData.map((equipment) => (
              <Equipment
                key={equipment.id}
                equipment={equipment}
                onClick={() => handleEquipmentClick(equipment)}
              />
            ))}
          </div>
        )}
      </Containt>


      {selectedEquipment && (
        <Modal onClose={closeModal}>
          <h2>Histórico de Estados - {selectedEquipment.name}</h2>
          <ul>
            {equipmentStateHistory
              .find((history) => history.equipmentId === selectedEquipment.id)
              ?.states.map((state, index) => (
                <li key={index}>
                  <strong>Data:</strong> {new Date(state.date).toLocaleString()} -{" "}
                  <strong>Estado:</strong>{" "}
                  {equipmentStateData.find((s) => s.id === state.equipmentStateId)?.name || "Desconhecido"}
                </li>
              ))}
          </ul>
        </Modal>
      )}
    </HomeContainer>
  );
}

function processEquipmentData(
    equipment: Equipment[],
    equipmentModel: EquipmentModel[],
    equipmentState: EquipmentState[],
    equipmentStateHistory: { equipmentId: string; states: { date: string; equipmentStateId: string }[] }[],
    equipmentPositionHistory: { equipmentId: string; positions: { date: string; lat: number; lon: number }[] }[]
    ): ProcessedEquipment[] {
    return equipment.map((equip) => {
      // Encontrar o modelo do equipamento
      const model = equipmentModel.find(
        (model) => model.id === equip.equipmentModelId
      );

      // Mapear os ganhos por hora com os estados
      const hourlyEarningsWithState = model?.hourlyEarnings.map((earning) => {
        const state = equipmentState.find(
          (state) => state.id === earning.equipmentStateId
        );
        return {
          ...earning,
          stateName: state?.name || "Estado desconhecido",
          stateColor: state?.color || "#000000",
        };
      });

      // Obter o último estado do equipamento
      const stateHistory = equipmentStateHistory.find(
        (history) => history.equipmentId === equip.id
      );
      const lastStateEntry = stateHistory?.states.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];
      const lastState = equipmentState.find(
        (state) => state.id === lastStateEntry?.equipmentStateId
      );

      // Obter a última posição do equipamento
      const positionHistory = equipmentPositionHistory.find(
        (history) => history.equipmentId === equip.id
      );
      const lastPositionEntry = positionHistory?.positions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];

      // Retornar o equipamento processado
      return {
        ...equip,
        modelName: model?.name || "Modelo desconhecido",
        hourlyEarnings: hourlyEarningsWithState || [],
        lastState: {
          stateName: lastState?.name || "Estado desconhecido",
          stateColor: lastState?.color || "#000000",
          date: lastStateEntry?.date || null,
        },
        lastPosition: lastPositionEntry
          ? {
              lat: lastPositionEntry.lat,
              lon: lastPositionEntry.lon,
              date: lastPositionEntry.date,
            }
          : null,
      };
    });
}