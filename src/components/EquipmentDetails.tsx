import React from "react";
import { useEquipmentDetailsContext } from "../contexts/equipmentDetailsContext";
import { convertIsoToDate } from "../utils/convertIsoToDate";
import { formatToBRL } from "../utils/formatToBRL";

const EquipmentDetails: React.FC = () => {
  const { selectedEquipment } = useEquipmentDetailsContext();

  if (!selectedEquipment.name) {
    return (
      <div className="p-4">Selecione um equipamento para ver os detalhes.</div>
    );
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-center font-semibold text-gray-800">
        Detalhes do Equipamento
      </h2>
      <div className="flex flex-col gap-2">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-700">
            <strong>Nome:</strong> {selectedEquipment.name}
          </p>
          <p className="text-gray-700">
            <strong>Estado atual:</strong>{" "}
            {selectedEquipment.states[0].equipmentState.name}
          </p>
          <p className="text-gray-700">
            <strong>Modelo:</strong> {selectedEquipment.equipmentModel?.name}
          </p>
          {selectedEquipment.equipmentModel && (
            <div className="mt-1">
              <ul>
                {selectedEquipment.equipmentModel.hourlyEarnings.map(
                  (earning, index) => (
                    <li key={index} className="text-gray-700 text-sm">
                      Estado: {earning.equipmentState.name} - Valor por hora:{" "}
                      {formatToBRL(earning.value)}
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 max-h-[500px] overflow-y-auto">
          <h3 className="font-semibold mb-1 text-gray-800">
            Histórico de Estados:
          </h3>
          <ul>
            {selectedEquipment.states.map((state, index) => (
              <li key={index} className="text-gray-700">
                {convertIsoToDate(state.date).toLocaleString("pt-BR")} -{" "}
                {state.equipmentState.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { EquipmentDetails };
