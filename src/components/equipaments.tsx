import { useState } from "react";
import positions from "../../data/equipament.json";
import { IEquipaments } from "../types/equipaments";
import MapComponent from "./map-component";
import Button from "./button";
import Modal from "./modal";
import equipamentsStateHistory from "../../data/equipamentStateHistory.json";
import equipamentState from "../../data/equipamentState.json"
import { formatDate } from "../../helpers/functions";

export default function Equipaments() {
  const [equipaments, setEquipaments] = useState<IEquipaments>({} as IEquipaments);
  const [searchEquipament, setSearchEquipament] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEquipament, setSelectedEquipament] = useState<IEquipaments | null>(null);

  const filteredEquipaments = positions.filter((equipament: IEquipaments) =>
    equipament.name.toLowerCase().includes(searchEquipament.toLowerCase())
  );

  const handlerClearData = () => {
    setEquipaments({} as IEquipaments);
  };

  const handlerOpenModal = (equipament: IEquipaments) => {
    setIsModalOpen(true);
    setSelectedEquipament(equipament);
  };

  const handlerCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEquipament(null);
  };

  return (
    <>
      <div className="flex justify-between items-center gap-2 p-2">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchEquipament}
          onChange={(e) => setSearchEquipament(e.target.value)}
          className="border border-black p-2 rounded w-[210px] -mb-10"
        />
        <div className="flex gap-2">
          <Button
            label="Detalhes"
            className={`-mb-10 ${equipaments.id ? "flex" : "hidden"}`}
            onClick={() => handlerOpenModal(equipaments)}
            disabled={!equipaments.id}
      
          />
          <Button label="Mais recentes" onClick={handlerClearData} className="-mb-10" />
        </div>
      </div>
      {equipaments.id && (
        <p className="text-center">
          Localizações do equipamento <span className="font-bold">{equipaments.name}</span>
        </p>
      )}
      <div className="flex justify-center items-center gap-2 mt-10">
        <div className="w-[260px] h-[500px] overflow-y-auto border border-gray-300 rounded-lg p-2">
          <ul>
            {filteredEquipaments.map((equipament: IEquipaments) => (
              <li
                key={equipament.id}
                onClick={() => setEquipaments(equipament)}
                className={`p-2 cursor-pointer hover:border-2 hover:border-amber-700 ${equipament.id === equipaments?.id
                  ? "border-2 border-amber-700"
                  : "border border-gray-200"
                  } rounded mb-1`}
              >
                <p>{equipament.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <MapComponent equipament={equipaments} />
        <Modal isOpen={isModalOpen} onClose={handlerCloseModal}>
          {selectedEquipament && (
            <div className="p-4">
              <h3 className="text-lg font-bold mb-4">Detalhes do Equipamento</h3>
              <p className="pb-4">
                <strong>Equipamento:</strong> {selectedEquipament.name}
              </p>
              {equipamentsStateHistory.find(
                (history) => history.equipmentId === selectedEquipament.id
              ) ? (
                equipamentsStateHistory
                  .filter((history) => history.equipmentId === selectedEquipament.id)
                  .map((history, index) => (
                    <div key={index} className="mb-2 overflow-x-scroll h-[400px]">
                      {history.states.map((state, stateIndex) => {
                        const equipmentState = equipamentState.find(
                          (stateData) => stateData.id === state.equipmentStateId
                        );
                        return (
                          <div key={stateIndex} className="mb-4 flex items-center justify-between flex-row-reverse">
                            <p>
                              <strong>Data:</strong> {formatDate(state.date)}
                            </p>
                            <p>
                             
                              <span
                                className="inline-block px-2 py-1 rounded text-white"
                                style={{ backgroundColor: equipmentState?.color || "#ccc" }}
                              >
                                {equipmentState?.name || "Desconhecido"}
                              </span>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ))
              ) : (
                <p>Nenhum histórico de estados encontrado</p>
              )}
            </div>
          )}
        </Modal>
      </div>

    </>
  );
}
