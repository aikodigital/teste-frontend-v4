import React, { createContext, useState } from 'react';
import equipment from '../data/equipment.json';
import equipmentModel from '../data/equipmentModel.json';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';
import equipmentState from '../data/equipmentState.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [selectedEquipment, setSelectedEquipment] = useState("a7c53eb1-4f5e-4eba-9764-ad205d0891f9");

  const handleSelectedEquipment = (equipment) => {
    setSelectedEquipment(equipment)
  }

  // Mapeamento para equipmentModelId -> nome do modelo
  const modelIdToName = equipmentModel.reduce((acc, model) => {
    acc[model.id] = model.name;
    return acc;
  }, {});

  // Mapeamento para equipmentStateId -> nome do estado
  const stateIdToName = equipmentState.reduce((acc, state) => {
    acc[state.id] = state.name;
    return acc;
  }, {});

  // Extrair datas de equipmentStateHistory
  const stateDates = equipmentStateHistory.flatMap(state =>
    state.states.map(st => ({
      equipmentId: state.equipmentId,
      date: st.date,
      equipmentStateId: st.equipmentStateId // Inclui o estado
    }))
  );

  // Extrair datas de equipmentPositionHistory
  const positionDates = equipmentPositionHistory.flatMap(pos =>
    pos.positions.map(p => ({
      equipmentId: pos.equipmentId,
      date: p.date,
      position: [p.lat, p.lon] // Inclui a posição
    }))
  );

  // Concatenar os arrays
  const combinedDates = [...stateDates, ...positionDates];

  // Agrupar por equipmentId e data
  const uniqueDatesMap = {};

  combinedDates.forEach(entry => {
    const { equipmentId, date, equipmentStateId, position } = entry;

    // Se não existir uma entrada para esse equipmentId, cria uma
    if (!uniqueDatesMap[equipmentId]) {
      uniqueDatesMap[equipmentId] = {};
    }

    // Se não existir uma entrada para essa data, cria uma
    if (!uniqueDatesMap[equipmentId][date]) {
      uniqueDatesMap[equipmentId][date] = {
        date,
        equipmentStateId: null,
        position: null
      };
    }

    // Preenche o estado, se estiver presente
    if (equipmentStateId) {
      uniqueDatesMap[equipmentId][date].equipmentStateId = equipmentStateId;
    }

    // Preenche a posição, se estiver presente
    if (position) {
      uniqueDatesMap[equipmentId][date].position = position;
    }
  });

  // Função para preencher dados ausentes
  const fillMissingData = (entries) => {
    // Percorre de trás para frente e preenche valores nulos com os anteriores
    for (let i = 1; i < entries.length; i++) {
      const previous = entries[i - 1];
      const current = entries[i];

      // Preenche equipmentStateId se estiver ausente
      if (!current.equipmentStateId && previous.equipmentStateId) {
        current.equipmentStateId = previous.equipmentStateId;
      }

      // Preenche position se estiver ausente
      if (!current.position && previous.position) {
        current.position = previous.position;
      }
    }
  };

  // Transformar o map de uniqueDates em um objeto, mantendo o equipmentId e ordenando por data
  const uniqueDatesByEquipmentId = Object.fromEntries(
    Object.entries(uniqueDatesMap).map(([equipmentId, datesMap]) => {
      const entries = Object.values(datesMap).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      // Preenche os dados ausentes percorrendo o array para trás
      fillMissingData(entries);

      return [
        equipmentId,
        entries.map(({ date, equipmentStateId, position }) => ({
          date,
          equipmentStateId: stateIdToName[equipmentStateId] || 'Unknown', // Substitui equipmentStateId pelo nome
          position
        }))
      ];
    })
  );

  // Substituir o equipmentModelId pelo nome
  const datas = equipment.reduce((acc, data) => {
    acc[data.id] = {
      equipmentId: data.id,
      equipmentModelId: modelIdToName[data.equipmentModelId] || 'Unknown', // Substitui equipmentModelId pelo nome
      name: data.name,
      history: uniqueDatesByEquipmentId[data.id] || []
    };
    return acc;
  }, {});

  console.log(datas);



  

  return (
    <DataContext.Provider value={{ selectedEquipment, datas, handleSelectedEquipment }}>
      {children}
    </DataContext.Provider>
  );
};
