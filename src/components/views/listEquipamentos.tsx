import { useState } from "react";
import equipment from "../../../public/data/equipment.json";
import equipmentPositionHistory from "../../../public/data/equipmentPositionHistory.json";
import equipmentStateHistory from "../../../public/data/equipmentStateHistory.json";
import equipmentState from "../../../public/data/equipmentState.json";
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
} from "@/styles/views/listEquipamentos";

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

  const getHistory = (equipmentId: string) => {
    const positionHistory = equipmentPositionHistory.find(
      (pos) => pos.equipmentId === equipmentId
    )?.positions;

    const stateHistory = equipmentStateHistory.find(
      (state) => state.equipmentId === equipmentId
    )?.states;

    const findNearestState = (date: string) => {
      if (!stateHistory) return "Estado Desconhecido";

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

    const history = positionHistory?.map((pos) => {
      return {
        date: pos.date,
        lat: pos.lat,
        lon: pos.lon,
        state: findNearestState(pos.date),
      };
    });

    return history;
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
              <span>Modelo: {equip.equipmentModelId}</span>
            </EquipDetails>

            {activeEquipmentId === equip.id && (
              <HistorySection>
                {getHistory(equip.id)?.map((item, index) => (
                  <HistoryItem key={index}>
                    <span>Data: {item.date}</span>
                    <span>
                      Localização: Lat {item.lat}, Lon {item.lon}
                    </span>
                    <span>Estado: {item.state}</span>
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
