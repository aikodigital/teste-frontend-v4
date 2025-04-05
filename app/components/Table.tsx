"use client";

import { Banknote, History as HistoryIcon, MapPin } from "lucide-react";
import Modal from "./Modal";
import Map from "./Map";
import History from "./History";
import { useState } from "react";
import StateIndicator from "./StateIndicator";
import Income from "./Income";
import { formatMoneyToReal } from "../utils/data";

interface TableProps {
  columns: string[];
  equipmentData?: EquipmentData[];
  historyData?: HistoryModalType[];
  incomeData?: IncomeData[]
}

const Table: React.FC<TableProps> = ({
  columns,
  equipmentData,
  historyData,
  incomeData
}) => {
  const [modalMapIsOpen, setModalMapIsOpen] = useState(false);
  const [modalHistoryIsOpen, setModalHistoryIsOpen] = useState(false);
  const [modalIncomeIsOpen, setModalIncomeIsOpen] = useState(false)
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [historyId, setHistoryId] = useState("");
  const [incomeId, setIncomeId] = useState('')

  const openModalMap = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
    setModalMapIsOpen(true);
  };

  const openModalHistory = (id: string) => {
    setHistoryId(id);
    setModalHistoryIsOpen(true);
  };

  const openModalIncome = (id: string) => {
    setIncomeId(id);
    setModalIncomeIsOpen(true);
  };

 

  return (
    <div className="overflow-x-auto w-full p-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column: string) => {
              return (
                <th className="px-4 py-2 border-b border-gray-300 bg-gray-100 font-semibold">
                  {column}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {equipmentData &&
            equipmentData.map((item, index) => {
              const stateName =
                "name" in item.state ? item.state.name : "Desconhecido";
              const stateColor =
                "color" in item.state ? item.state.color : "#000";

              return (
                <tr
                  key={item.equipmentId + index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-2 border-b border-gray-300">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    <StateIndicator
                      stateName={stateName}
                      stateColor={stateColor}
                    />
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    <div
                      className="flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() =>
                        openModalMap(item.position?.lat!, item.position?.lon!)
                      }
                    >
                      <MapPin className="w-5 h-5 text-red-600" />
                      <p>Ver no mapa</p>
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    <div
                      className="flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() =>
                        openModalIncome(item.equipmentId)
                      }
                    >
                      <Banknote className="w-5 h-5 text-green-600" />  
                      <p>Ver rendimento</p>                    
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    <div
                      className="flex justify-center gap-2 cursor-pointer"
                      onClick={() => openModalHistory(item.equipmentId)}
                    >
                      <HistoryIcon className="w-5 h-5 text-[#033485]" />
                      <p>Ver histórico</p>
                    </div>
                  </td>
                </tr>
              );
            })}
          {historyData &&
            historyData.map((item, index) => {
              const stateName =
                "name" in item.state ? item.state.name : "Desconhecido";
              const stateColor =
                "color" in item.state ? item.state.color : "#000";
              return (
                <tr
                  key={item.equipmentId + index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-2 border-b border-gray-300">
                    {item.date}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    <StateIndicator
                      stateName={stateName}
                      stateColor={stateColor}
                    />
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {item.position.lat && item.position.lon ? (
                      <div
                        className="flex items-center justify-center gap-2 cursor-pointer"
                        onClick={() => {
                          openModalMap(
                            item.position?.lat!,
                            item.position?.lon!
                          );
                        }}
                      >
                        <MapPin className="w-5 h-5 text-red-600" />
                        <p>Ver no mapa</p>
                      </div>
                    ) : (
                      "Não há dados de posição para esta data"
                    )}
                  </td>
                </tr>
              );
            })}
            {incomeData &&
            incomeData.map((item, index) => {
              return (
                <tr
                  key={item.date + index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-2 border-b border-gray-300">
                    {item.date}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {item.hoursInOperation}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {item.hoursInMaintainance}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {item.hoursStopped}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {formatMoneyToReal(item.totalIncome)}
                  </td>
                  
                </tr>
              );
            })}
        </tbody>
      </table>
      <Modal isOpen={modalMapIsOpen} onClose={() => setModalMapIsOpen(false)}>
        <Map lat={coordinates.lat} lon={coordinates.lon} />
      </Modal>
      <Modal
        isOpen={modalHistoryIsOpen}
        onClose={() => setModalHistoryIsOpen(false)}
      >
        <History id={historyId} />
      </Modal>
      <Modal isOpen={modalIncomeIsOpen} onClose={() => setModalIncomeIsOpen(false)}>
        <Income id={incomeId} />
      </Modal>
    </div>
  );
};

export default Table;
