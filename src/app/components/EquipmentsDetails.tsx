"use client";

import { useEquipment } from "@/app/context/EquipmentContex";

interface EquipmentDetailsProps {
  equipmentId: string;
}

const EquipmentDetails = ({ equipmentId }: EquipmentDetailsProps) => {
  const { stateHistory, states } = useEquipment();

  const history = stateHistory.find((item) => item.equipmentId === equipmentId)?.states || [];

  return (
    <div>
      <h2
        style={{
          fontSize: "22px",
          textAlign: "center",
          marginBottom: "6px",
        }}
      >
        Histórico do equipamento
      </h2>

      <ul
        style={{
          maxHeight: "100px",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {history.map((entry, index) => {
          const state = states.find((s) => s.id === entry.equipmentStateId);
          return (
            <li
              key={index}
              className="p-2 bg-gray-100 rounded-md"
              style={{ color: state?.color }}
            >
              {state?.name} - {new Date(entry.date).toLocaleString()}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EquipmentDetails;
