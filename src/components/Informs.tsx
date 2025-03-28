import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/informs.css"; // Certifique-se de importar o arquivo de CSS

interface EquipmentStateHistory {
  date: string;
  equipmentStateId: string;
}

interface Productivity {
  productivity: number;
  hoursWorked: number;
}

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface HourlyEarnings {
  equipmentStateId: string;
  value: number;
}

interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
  lastState: EquipmentState;
  stateHistory: EquipmentStateHistory[];
  modelHourlyEarnings?: HourlyEarnings[];
}

interface InformsProps {
  filteredEquipments: (equipments: Equipment[], selectedEquipmentFilter: string, selectedStateFilter: string) => Equipment[];
  equipments: Equipment[];
  selectedEquipmentFilter: string;
  selectedStateFilter: string;
  selectedDate: string;
  calculateProductivity: (equipment: Equipment, selectedDate: string) => Productivity;
}

const Informs: React.FC<InformsProps> = ({
  filteredEquipments,
  equipments,
  selectedEquipmentFilter,
  selectedStateFilter,
  selectedDate,
  calculateProductivity,
}) => {
  const equipmentData = filteredEquipments(
    equipments,
    selectedEquipmentFilter,
    selectedStateFilter,
  )?.map((equipment: Equipment) => { 
    const { productivity, hoursWorked }: Productivity = calculateProductivity(equipment, selectedDate);
    return {
      name: equipment.name,
      productivity: productivity.toFixed(2),
      hoursWorked: hoursWorked.toFixed(2),
    };
  }) || [];

  return (
    <div className="productivity">
      <h3>Produtividade de Todos os Equipamentos</h3>
      <div className="dados">
        <div className="informacoes">
          <ul>
            {equipmentData.map((equipment) => (
              <li key={equipment.name}>
                <strong>{equipment.name}</strong>: 
                <span>{equipment.productivity}%</span> - 
                <span>{equipment.hoursWorked} horas trabalhadas</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="recharts-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={equipmentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="productivity" fill="#2ecc71" name="Produtividade (%)" />
              <Bar dataKey="hoursWorked" fill="#f1c40f" name="Horas Trabalhadas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Informs;
