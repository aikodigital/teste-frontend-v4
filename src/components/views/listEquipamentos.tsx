import { useState } from "react";
import {
  MainContainer,
  Title,
  EquipList,
  EquipItem,
  EquipName,
  EquipDetails,
  HistorySection,
  HistoryItem,
  SelectContainer,
  SearchContainer,
  FiltersContainer,
  BoldLabel,
} from "@/styles/views/listEquipamentos";

import equipment from "../../../public/data/equipment.json";
import equipmentPositionHistory from "../../../public/data/equipmentPositionHistory.json";
import equipmentStateHistory from "../../../public/data/equipmentStateHistory.json";
import equipmentState from "../../../public/data/equipmentState.json";
import equipmentModel from "../../../public/data/equipmentModel.json";

const calculateProductivity = (equipmentId: string): number => {
  const stateHistory = equipmentStateHistory.find(
    (entry) => entry.equipmentId === equipmentId
  )?.states;

  if (!stateHistory || stateHistory.length === 0) return 0;

  let totalTime = 0;
  let operatingTime = 0;

  for (let i = 0; i < stateHistory.length - 1; i++) {
    const currentState = stateHistory[i];
    const nextState = stateHistory[i + 1];

    const currentDate = new Date(currentState.date).getTime();
    const nextDate = new Date(nextState.date).getTime();
    const timeDifference = (nextDate - currentDate) / (1000 * 60 * 60);

    totalTime += timeDifference;

    const equipmentStateItem = equipmentState.find(
      (eqState) => eqState.id === currentState.equipmentStateId
    );
    if (equipmentStateItem && equipmentStateItem.name === "Operando") {
      operatingTime += timeDifference;
    }
  }

  return (operatingTime / totalTime) * 100;
};

const calculateEarnings = (equipmentId: string): number => {
  const equip = equipment.find((e) => e.id === equipmentId);
  if (!equip) return 0;

  const model = equipmentModel.find((m) => m.id === equip.equipmentModelId);
  if (!model) return 0;

  const stateHistory = equipmentStateHistory.find(
    (entry) => entry.equipmentId === equipmentId
  )?.states;

  if (!stateHistory || stateHistory.length === 0) return 0;

  let earnings = 0;

  for (let i = 0; i < stateHistory.length - 1; i++) {
    const currentState = stateHistory[i];
    const nextState = stateHistory[i + 1];

    const currentDate = new Date(currentState.date).getTime();
    const nextDate = new Date(nextState.date).getTime();
    const timeDifference = (nextDate - currentDate) / (1000 * 60 * 60);

    const equipmentStateItem = equipmentState.find(
      (eqState) => eqState.id === currentState.equipmentStateId
    );

    if (equipmentStateItem) {
      const hourlyEarning = model.hourlyEarnings.find(
        (earn) => earn.equipmentStateId === equipmentStateItem.id
      );

      const rate = hourlyEarning ? hourlyEarning.value : 0;
      earnings += timeDifference * rate;
    }
  }

  return earnings;
};

const getHistory = (equipmentId: string) => {
  const positionHistory = equipmentPositionHistory.find(
    (pos) => pos.equipmentId === equipmentId
  )?.positions;

  const stateHistory = equipmentStateHistory.find(
    (state) => state.equipmentId === equipmentId
  )?.states;

  if (!positionHistory || !stateHistory) return [];

  const findNearestState = (date: string) => {
    const nearestState = stateHistory
      .filter((st) => new Date(st.date) <= new Date(date))
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];

    if (!nearestState) return "Estado Desconhecido";

    const equipState = equipmentState.find(
      (st) => st.id === nearestState.equipmentStateId
    );

    return equipState ? equipState.name : "Estado Desconhecido";
  };

  return positionHistory.map((pos) => {
    return {
      date: pos.date,
      lat: pos.lat,
      lon: pos.lon,
      state: findNearestState(pos.date),
    };
  });
};

export default function ListEquipamentos() {
  const [activeEquipmentId, setActiveEquipmentId] = useState<string | null>(
    null
  );
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleClick = (id: string) => {
    setActiveEquipmentId(activeEquipmentId === id ? null : id);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEquipmentId(event.target.value || null);
    setActiveEquipmentId(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSelectedEquipmentId(null);
  };

  const filteredEquipment = equipment
    .filter((equip) =>
      equip.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((equip) =>
      selectedEquipmentId ? equip.id === selectedEquipmentId : true
    );

  return (
    <MainContainer>
      <Title>Lista de Equipamentos</Title>
      <FiltersContainer>
        <SearchContainer>
          <input
            type="text"
            placeholder="Pesquisar por nome do equipamento"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchContainer>

        <SelectContainer>
          <select
            onChange={handleSelectChange}
            value={selectedEquipmentId || ""}
          >
            <option value="">Todos os Equipamentos</option>
            {equipment.map((equip) => (
              <option key={equip.id} value={equip.id}>
                {equip.name}
              </option>
            ))}
          </select>
        </SelectContainer>
      </FiltersContainer>

      <EquipList>
        {filteredEquipment.map((equip) => (
          <EquipItem key={equip.id} onClick={() => handleClick(equip.id)}>
            <EquipName>{equip.name}</EquipName>
            <EquipDetails>
              <span>
                <BoldLabel>Modelo:</BoldLabel> {equip.equipmentModelId}
              </span>
              <span>
                <BoldLabel>Produtividade:</BoldLabel>{" "}
                {calculateProductivity(equip.id).toFixed(2)}%
              </span>
              <span>
                <BoldLabel>Ganho:</BoldLabel> R${" "}
                {calculateEarnings(equip.id).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </EquipDetails>

            {activeEquipmentId === equip.id && (
              <HistorySection>
                {getHistory(equip.id).map((item, index) => (
                  <HistoryItem key={index}>
                    <span>
                      <strong>Data:</strong> {item.date}
                    </span>
                    <span>
                      <strong>Localização:</strong> Lat {item.lat}, Lon{" "}
                      {item.lon}
                    </span>
                    <span>
                      <strong>Estado:</strong> {item.state}
                    </span>
                  </HistoryItem>
                ))}
              </HistorySection>
            )}
          </EquipItem>
        ))}
      </EquipList>
    </MainContainer>
  );
}
