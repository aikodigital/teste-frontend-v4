import React, { useEffect, useState } from "react";
import { Equipment } from "./../../types";
import equipmentStateHistory from "../../../data/equipmentStateHistory.json";
import { findEquipmentName } from "../utils/findEquipmentName";
import { drawerStore } from "../../store/drawerStore";
import { Drawer } from "./Drawer";
import { findEquipmentState } from "../utils/findEquipmentState";
import { dataFormater } from "../utils/dataFormater";
import equipmentModel from "../../../data/equipmentModel.json";

interface EquipmentDetailsProps {
  equipment: Equipment | null;
}

const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({ equipment }) => {
  const drawerStatus = drawerStore((state) => state.drawerStatus);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [productivity, setProductivity] = useState<string>("");
  const [gain, setGain] = useState<string>("");

  const stateHistory = equipment
    ? equipmentStateHistory.find((sh) => sh.equipmentId === equipment.id)
    : null;

  const filteredStates = stateHistory?.states.filter((state) => {
    const equipmentStatus = findEquipmentState(state.equipmentStateId);
    return statusFilter ? equipmentStatus === statusFilter : true;
  });

  useEffect(() => {
    if (stateHistory && equipment) {
      const totalHours = 24;
      let operatingHours = 0;
      let gainAmount = 0;

      const equipmentModelData = equipmentModel.find(
        (model) => model.id === equipment.equipmentModelId
      );

      if (equipmentModelData) {
        const hourlyEarnings = equipmentModelData.hourlyEarnings;

        stateHistory.states.forEach((state) => {
          const equipmentStateId = state.equipmentStateId;
          const equipmentStatus = findEquipmentState(equipmentStateId);
          
          const earning = hourlyEarnings.find(
            (earning) => earning.equipmentStateId === equipmentStateId
          );

          if (earning) {
            if (equipmentStatus === "Operando") {
              operatingHours += 1;
            }
            gainAmount += earning.value;
          }
        });

        const productivityPercentage = (operatingHours / totalHours) * 100;
        setProductivity(productivityPercentage.toFixed(2));
        setGain(gainAmount.toFixed(2));
      }
    }
  }, [stateHistory, equipment]);

  if (!equipment) {
    return null;
  }

  return (
    <div className="flex">
      {drawerStatus && <Drawer />}
      <div className="h-screen w-[450px] overflow-y-scroll p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detalhes do Equipamento</h2>
        <p className="text-black mb-6">
          <span className="font-medium">Nome: </span>
          {equipment?.equipmentModelId
            ? findEquipmentName(equipment.equipmentModelId)
            : "Não disponível"}
        </p>
        <p className="text-black mb-6">
          <span className="font-medium">Modelo: </span>
          {equipment?.name}
        </p>

        <p className="text-black mb-6">
          <span className="font-medium">
            Produtividade do equipamento: {productivity}%
          </span>
        </p>

        <p className="text-black mb-6">
          <span className="font-medium">Ganho por equipamento: R$ {gain}</span>
        </p>

        <div className="flex items-center mb-6 space-x-2 text-black">
          <select
            className="py-2 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos os Status</option>
            <option value="Operando">Operando</option>
            <option value="Manutenção">Manutenção</option>
            <option value="Parado">Parado</option>
          </select>
        </div>

        {filteredStates && filteredStates.length > 0 ? (
          <>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Histórico de Estados:</h3>
            <ul className="space-y-2">
              {filteredStates.map((state, index) => (
                <li
                  key={index}
                  className="p-3 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition-all"
                >
                  <span className="text-sm text-gray-600">
                    {dataFormater(state.date)}
                  </span>
                  <span className="block text-gray-800 font-medium">
                    Estado: {findEquipmentState(state.equipmentStateId)}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-gray-500">
            Nenhum estado encontrado com os filtros selecionados.
          </p>
        )}
      </div>
      {drawerStatus && <Drawer />}
    </div>
  );
};

export default EquipmentDetails;
