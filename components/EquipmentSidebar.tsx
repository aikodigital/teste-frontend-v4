import React from "react";
import formatDateTime from "../utils/dateConverter";
import EquipmentSidebarProps from "../utils/interface";
import EquipmentListSection from "./EquipmentListSection";

const EquipmentSidebar: React.FC<EquipmentSidebarProps> = ({ equipment, onClose }) => {
    const stateItems =
        equipment.stateHistory?.map(
            (state) => `${state.name} - ${formatDateTime(state.date)}`
        ) || [];

    const positionItems =
        equipment.positionHistory?.map(
            (pos) => `Data: ${formatDateTime(pos.date)} | Lat: ${pos.lat}, Lon: ${pos.lon}`
        ) || [];

    return (
        <div style={{
            width: "350px",
            height: "100%",
            backgroundColor: "#fff",
            padding: "16px",
            boxShadow: "-2px 0 10px rgba(0,0,0,0.1)",
            overflowY: "auto"
        }}>
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <button
                    className="text-gray-500 hover:text-gray-700 font-bold text-sm"
                    onClick={onClose}
                >
                    ✕
                </button>
                <h2 className="text-lg font-semibold">{equipment.name}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <p className="text-sm text-gray-800">
                    <strong>Produtividade:</strong> {equipment.productivity}
                    <strong>Receita:</strong> R$ {equipment.revenue?.toFixed(2)}
                </p>

                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                    <EquipmentListSection
                        title="Histórico de Estados"
                        items={stateItems}
                        emptyMessage="Nenhum estado registrado"
                    />
                </div>

                <div style={{ maxHeight: "200px", overflowY: "auto", marginTop: "30px" }}>
                    <EquipmentListSection
                        title="Histórico de Posições"
                        items={positionItems}
                        emptyMessage="Nenhuma posição registrada"
                    />
                </div>
            </div>
        </div>
    );
};

export default EquipmentSidebar;