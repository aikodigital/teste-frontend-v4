import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { DataContext } from "../context/DataContext";

export default function MainState() {
  const { datas, handleSelectedEquipment, selectedEquipment } = useContext(DataContext);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [openEquipmentId, setOpenEquipmentId] = useState(null); // Estado para controlar o dropdown aberto
  const [history, setHistory] = useState([])

  // Convertendo o objeto `datas` em um array de valores
  const datasArray = Object.values(datas);

  // Sincroniza o estado local com o valor do contexto quando o selectedEquipment mudar
  useEffect(() => {
    if (selectedEquipment) {
      setSelectedEquipmentId(selectedEquipment);
      setHistory(datas[selectedEquipment]?.history || []); // Atualiza o histórico com base no equipamento selecionado
    }
  }, [selectedEquipment, datas]);

  // Função para selecionar o equipamento
  const selectEquipment = (equipmentId) => {
    handleSelectedEquipment(equipmentId);

    // Toggle para abrir ou fechar o dropdown
    setOpenEquipmentId((prevId) => (prevId === equipmentId ? null : equipmentId));
  };

  // Função para selecionar a imagem baseada no estado do equipamento
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
    return "/img/default.svg"; // Ícone padrão caso o estado não corresponda
  };

  // Função para formatar a data e a hora
  const formatDateTime = (isoDateString) => {
    const date = new Date(isoDateString);

    // Extrair apenas a parte da hora da string ISO
    const time = isoDateString.split("T")[1].split(".")[0]; // Extrai "03:00:00"

    // Formatar a data sem alterar o fuso horário
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return `${formattedDate} ${time}`; // Combina data formatada e hora original
  };
  return (
    <>
      <div className="px-24">
        <h1 className="font-roboto font-bold text-3xl text-[#003184] py-8">ESTADOS</h1>

        <div className="mx-16">
          <div className="relative max-h-[600px] overflow-y-auto">
            {datasArray.map((data, index) => (
              <div className="mb-2" key={index}>
                <div
                  onClick={() => selectEquipment(data.equipmentId)}
                  className={`relative rounded-lg pl-4 grid grid-cols-3 gap-40 py-1 border-b-2 border-[#BFBFBF] cursor-pointer ${selectedEquipmentId === data.equipmentId ? "bg-[#D4D4D4]" : ""}`}
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
                    <Image
                      src="/img/chevron-bottom.svg"
                      alt="chevron"
                      width={20}
                      height={20}
                      className="absolute right-4 top-3"
                    />
                  </div>
                </div>

                {/* Dropdown: informações adicionais */}
                {openEquipmentId === data.equipmentId && (
                  <div className="relative max-h-40 overflow-y-auto">
                    {history.map((his, index) => (
                      <div key={index} className="flex justify-between px-4 py-2 bg-[#f9f9f9] border-t border-[#BFBFBF]">
                        <p className="font-roboto text-sm text-[#494949]">
                          <strong>Data da atualização:</strong> {formatDateTime(his.date)}
                        </p>
                        <div className="flex gap-2">
                          <p className="font-roboto text-sm text-[#494949]">
                            {his?.equipmentStateId || "N/A"}
                          </p>
                          <Image
                            src={selectUrlImg(his.equipmentStateId)}
                            alt="operando"
                            width={10}
                            height={10}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
