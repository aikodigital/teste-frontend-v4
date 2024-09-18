import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  EquipmentState,
  EquipmentStateHistory,
  Equipment,
} from "../../../types";
import Lottie from "react-lottie";
import lottieMarkerAnimation from "../../../assets/marker.json";
import Pagination from "./EquipamentTablePagination";

interface TableInfoProps {
  filteredHistories: EquipmentStateHistory[];
  states: EquipmentState[];
  selectedEquipment: Equipment | null;
  EquipmentFilters: React.ReactNode;
  equipmentName: string;
}

const ITEMS_PER_PAGE = 10;

const getIcon = (stateId: string, states: EquipmentState[]) => {
  const state = states.find((state) => state.id === stateId);

  if (!state) return null;

  switch (state.name) {
    case "Operando":
      return <span style={{ fontSize: "24px", color: "#2ecc71" }}>🚛</span>;
    case "Manutenção":
      return <span style={{ fontSize: "24px", color: "#f39c12" }}>🛠️</span>;
    case "Parado":
      return <span style={{ fontSize: "24px", color: "#e74c3c" }}>⚙️</span>;
    default:
      return <span style={{ fontSize: "24px", color: "#f5f5f5" }}>📍</span>;
  }
};

const calculateHours = (
  states: any[],
  stateName: string,
  allStates: EquipmentState[]
) => {
  const state = allStates.find((s) => s.name === stateName);
  if (!state) return 0;

  return states.filter((record) => record.equipmentStateId === state.id).length; 
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: lottieMarkerAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const TableInfo: React.FC<TableInfoProps> = ({
  filteredHistories,
  states,
  selectedEquipment,
  EquipmentFilters,
  equipmentName,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!selectedEquipment) {
    return (
      <div className="text-center rounded-xl bg-white py-8">
        <div className="lottie-container">
          <Lottie options={defaultOptions} height={550} width={550} />
        </div>
        <h2 className="text-3xl text-indigo-500 font-semibold">
          Selecione um equipamento para ver informações.
        </h2>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const flattenedHistories = filteredHistories.flatMap(
    (history) => history.states
  );

  const paginatedHistories = flattenedHistories.slice(startIndex, endIndex);

  const totalItems = flattenedHistories.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalHours = flattenedHistories.length; 
  const operandoHours = calculateHours(flattenedHistories, "Operando", states);
  const produtividade = totalHours > 0 ? (operandoHours / totalHours) * 100 : 0;


  const ganhoPorHora = { Operando: 100, Manutenção: -20, Parado: -5 }; 
  const operandoGanho =
    calculateHours(flattenedHistories, "Operando", states) *
    ganhoPorHora.Operando;
  const manutencaoGanho =
    calculateHours(flattenedHistories, "Manutenção", states) *
    ganhoPorHora.Manutenção;
  const paradoGanho =
    calculateHours(flattenedHistories, "Parado", states) * ganhoPorHora.Parado;

  const ganhoTotal = operandoGanho + manutencaoGanho + paradoGanho;

  return (
    <div className="overflow-x-auto">
      <div className="rounded-lg">
        <div className="flex flex-col">
          <div className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-t-lg">
            <h2 className="text-2xl font-bold">
              {"Equipamento: " + equipmentName} <br />
            </h2>
            {EquipmentFilters}
          </div>
          <div className="flex justify-between bg-indigo-600 px-6">
            <h1 className="text-2xl font-bold">
              Produtividade: {produtividade.toFixed(2)}%
            </h1>
            <h1 className="text-2xl font-bold">
              Ganho Total: R$ {ganhoTotal.toFixed(2)}
            </h1>
          </div>
          <table className="w-full bg-gray-50 border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-900 border-t-2 border-b-2 border-b-indigo-600 border-t-indigo-600 text-gray-100">
                <th className="py-3 px-4 border-b text-center">Ícone</th>
                <th className="py-3 px-4 border-b text-center">Estado</th>
                <th className="py-3 px-4 border-b text-center">Data</th>
              </tr>
            </thead>
            <tbody>
              {paginatedHistories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    Nenhuma informação disponível.
                  </td>
                </tr>
              ) : (
                paginatedHistories.map((stateRecord) => (
                  <tr
                    className="even:bg-white odd:bg-white text-gray-900 font-bold"
                    key={stateRecord.date}
                  >
                    <td className="py-3 px-4 text-center">
                      {getIcon(stateRecord.equipmentStateId, states)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {states.find(
                        (state) => state.id === stateRecord.equipmentStateId
                      )?.name || "Desconhecido"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {format(new Date(stateRecord.date), "dd/MM/yyyy HH:mm")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TableInfo;
