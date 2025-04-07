import React from "react";
import { Equipment } from "../../../types/equipment";
import InfoSection from "./InfoSection";
import TimelineSection from "./TimelineSection";

interface EquipDetailProps {
  equipment: Equipment | null;
  setActivePathStartIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const EquipDetail: React.FC<EquipDetailProps> = ({
  equipment,
  setActivePathStartIndex,
}) => {
  if (!equipment) {
    return (
      <div style={{ padding: "1em" }}>
        <h3>Nenhum equipamento selecionado</h3>
        <p>Selecione um equipamento na lista ou no mapa para ver detalhes.</p>
      </div>
    );
  }
  return (
    <div className="equipments-detailed">
      <h3>Equipamento {equipment.name}</h3>
      <InfoSection equipment={equipment} />
      <h3 style={{ paddingTop: "1em" }}>Histórico</h3>
      <TimelineSection
        equipment={equipment}
        setActivePathStartIndex={setActivePathStartIndex}
      />
    </div>
  );
};

export default EquipDetail;
