import { useState, useContext, useEffect } from "react";
import Map from "./Mapa";
import Image from "next/image";
import { DataContext } from "../context/DataContext";

export default function Main() {
  const { selectedEquipment, datas, handleSelectedEquipment } = useContext(DataContext);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);

  // Sincroniza o estado local com o valor do contexto quando o selectedEquipment mudar
  useEffect(() => {
    if (selectedEquipment) {
      setSelectedEquipmentId(selectedEquipment);
    }
  }, [selectedEquipment]);

  // Função para selecionar o equipamento
  const selectEquipment = (equipmentId) => {
    handleSelectedEquipment(equipmentId);
  };

  const selectUrlImg = (state) => {
    if (state === "Operando") {
      return "/img/operando.svg";
    }
    if (state === "Parado") {
      return "/img/parado.svg";
    }
    if (state === "Manutenção") {
      return "/img/manutencao.svg";
    }
  };

  // Convertendo o objeto `datas` em um array de valores
  const datasArray = Object.values(datas);

  return (
    <>
      <div className="px-24">
        <h1 className="font-roboto font-bold text-3xl text-[#003184] py-8">POSIÇÕES</h1>
        <div className="flex justify-center">
          <Map />
        </div>

        <div className="mx-16">
          <div className="grid grid-cols-3 pl-4 gap-40 pt-8 pb-2">
            <h1 className="font-roboto font-bold text-[#494949] text-lg">MODELO</h1>
            <h1 className="font-roboto font-bold text-[#494949] text-lg">NOME</h1>
            <h1 className="font-roboto font-bold text-[#494949] text-lg">ESTADO ATUAL</h1>
          </div>
          <div className="relative max-h-48 overflow-y-auto">
            {datasArray.map((data, index) => (
              <div
                key={index}
                onClick={() => selectEquipment(data.equipmentId)}
                className={`rounded-lg pl-4 grid grid-cols-3 gap-40 py-1 border-b-2 border-[#BFBFBF] cursor-pointer ${selectedEquipmentId === data.equipmentId ? "bg-[#D4D4D4]" : ""}`}
              >
                <p className="font-roboto text-[#494949] text-lg">{data.equipmentModelId}</p>
                <p className="font-roboto text-[#494949] text-lg">{data.name}</p>
                <div className="flex gap-1">
                  <Image
                    src={selectUrlImg(data.history[data.history.length - 1].equipmentStateId)}
                    alt="operando"
                    width={15}
                    height={15}
                  />
                  <p className="font-roboto text-[#494949] text-lg">
                    {data.history[data.history.length - 1].equipmentStateId}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
