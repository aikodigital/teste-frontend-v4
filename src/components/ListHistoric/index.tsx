import "./styles.scss";
import React from "react";
import history from "../../data/equipmentStateHistory.json";
import stateData from "../../data/equipmentState.json";
import equipmentModel from "../../data/equipmentModel.json";

interface EquipmentStateHistoryProps {
  equipmentId: string;
  equipment: { id: string; equipmentModelId: string; name: string }[]; // Adicione a tipagem correta para equipment
}

const ListHistoric: React.FC<EquipmentStateHistoryProps> = ({
  equipmentId,
  equipment,
}) => {
  const equipmentHistory = history.find(
    (item) => item.equipmentId === equipmentId
  );

  if (!equipmentHistory) {
    return <p>Sem histórico para este equipamento.</p>;
  }

  // Função para obter o nome do equipamento com base no equipmentId
  const getEquipmentName = (equipmentId: string) => {
    const equipmentItem = equipment.find((e) => e.id === equipmentId);
    if (equipmentItem) {
      const model = equipmentModel.find(
        (model) => model.id === equipmentItem.equipmentModelId
      );
      return model ? model.name : "Nome do modelo desconhecido";
    }
    return "Nome desconhecido";
  };

  return (
    <div className="containterBox">
      <table >
        <div className="scroll">
        <p><strong>{getEquipmentName(equipmentId)}</strong></p>
          <thead>
            <tr>
              <th>Data</th>
              <th>Estado</th>
              <th>Cor</th>
            </tr>
          </thead>
          <tbody className="containerList">
            {equipmentHistory.states.map((state, index) => {
              const stateInfo = stateData.find(
                (s) => s.id === state.equipmentStateId
              );
              return (
                <tr key={`${state.equipmentStateId}-${index}`}>
                  <td>{new Date(state.date).toLocaleString()}</td>
                  <td>{stateInfo ? stateInfo.name : "Desconhecido"}</td>
                  <td className="color">
                    <div
                      style={{
                        backgroundColor: stateInfo?.color,
                        width: "20px",
                        height: "20px",
                        borderRadius: "6px",
                      }}
                    ></div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </div>
      </table>
    </div>
  );
};

export default ListHistoric;
