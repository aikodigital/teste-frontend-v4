import React from 'react';
import "../styles/filtered.css";

const Filtered: React.FC<{ 
  equipments: { id: string | number; name: string }[]; 
  availableDates: string[]; 
  equipmentStates: { id: string | number; name: string }[]; 
  selectedDate: string;
  selectedStateFilter: string;
  selectedEquipmentFilter: string;
  setSelectedEquipmentFilter: (value: string) => void;
  setSelectedStateFilter: (value: string) => void;
  setSelectedDate: (value: string) => void;
}> = ({ equipments, availableDates, equipmentStates,selectedDate, selectedStateFilter,selectedEquipmentFilter, setSelectedEquipmentFilter, setSelectedStateFilter, setSelectedDate }) => {

  return (
    <div>
      <h1 className="text-center mb-4 title">Sistema de Monitoramento de Equipamentos Florestais</h1>
      <p className="lead text-center subtitle">Monitore a localização e estado dos equipamentos em tempo real.</p>
      <div className='alinhar'>
        <div className="mb-4">
          <select
            className="form-control"
            value={selectedEquipmentFilter}
            onChange={(e) => setSelectedEquipmentFilter(e.target.value)}
          >
            <option value="">Selecione um Equipamento</option>
            {equipments.map((equipment: { id: string | number; name: string }) => (
              <option key={equipment.id} value={equipment.name}>
                {equipment.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <select
            className="form-control"
            value={selectedStateFilter}
            onChange={(e) => setSelectedStateFilter(e.target.value)}
          >
            <option value="">Todos os Estados</option>
            {equipmentStates.map((state: { id: string | number; name: string }) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <select
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">Todas as Datas</option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filtered;
